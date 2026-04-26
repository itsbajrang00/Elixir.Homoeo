import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, onSnapshot, query, orderBy, setDoc, doc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth';
import { handleFirestoreError, OperationType } from '../firebaseUtils';
import { Star, Calendar } from 'lucide-react';

interface Review {
  id: string;
  reviewerId: string;
  reviewerName: string;
  rating: number;
  comment: string;
  createdAt: Timestamp | null;
}

export function ReviewSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const unsubAuth = auth.onAuthStateChanged(setUser);
    const q = query(collection(db, 'reviews'), orderBy('createdAt', 'desc'));
    
    const unsubDb = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(d => ({ id: d.id, ...d.data() } as Review));
      setReviews(data);
    }, (error) => {
      handleFirestoreError(error, OperationType.LIST, 'reviews');
    });

    return () => {
      unsubAuth();
      unsubDb();
    };
  }, []);

  const handleLogin = async () => {
    setErrorMsg('');
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (err: any) {
      if (err.code === 'auth/popup-closed-by-user') {
        console.log('Sign in cancelled by user');
      } else {
        console.error('Login error:', err);
        setErrorMsg('Login failed. If popups are blocked, please open the website in a new tab to sign in.');
      }
    }
  };

  const handleAddReviewClick = () => {
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
        // Try to log in first
        setErrorMsg('');
        try {
          const provider = new GoogleAuthProvider();
          await signInWithPopup(auth, provider);
          // if it succeeds, user state will update via onAuthStateChanged, but we need the current user NOW
          if (auth.currentUser) {
              setSubmitting(true);
              try {
                const newReviewRef = doc(collection(db, 'reviews'));
                await setDoc(newReviewRef, {
                  reviewerId: auth.currentUser.uid,
                  reviewerName: auth.currentUser.displayName || 'Anonymous User',
                  rating,
                  comment,
                  createdAt: serverTimestamp()
                });
                setIsModalOpen(false);
                setComment('');
                setRating(5);
              } catch (error) {
                handleFirestoreError(error, OperationType.CREATE, `reviews/${auth.currentUser.uid}`);
              } finally {
                setSubmitting(false);
              }
          }
        } catch (err: any) {
          if (err.code === 'auth/popup-closed-by-user') {
            console.log('Sign in cancelled by user');
          } else {
            console.error('Login error:', err);
            setErrorMsg('Google Sign-In was blocked. Please open this website in a new tab (using the button at the top right of the preview) to write a review.');
          }
        }
        return;
    }

    setSubmitting(true);
    try {
      const newReviewRef = doc(collection(db, 'reviews'));
      await setDoc(newReviewRef, {
        reviewerId: user.uid,
        reviewerName: user.displayName || 'Anonymous User',
        rating,
        comment,
        createdAt: serverTimestamp()
      });
      setIsModalOpen(false);
      setComment('');
      setRating(5);
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, `reviews/${user.uid}`);
    } finally {
      setSubmitting(false);
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for(let i=1; i<=5; i++) {
       stars.push(
         <Star 
           key={i} 
           className={`w-4 h-4 md:w-5 md:h-5 ${i <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-300'}`} 
         />
       );
    }
    return <div className="flex space-x-1">{stars}</div>;
  };

  return (
    <section className="py-16 bg-white" id="reviews">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif text-slate-900 mb-4 tracking-tight">Patient Reviews</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg">Hear what our patients have to say about their healing journey.</p>
        </div>

        <div className="flex flex-col items-end mb-8">
          <button 
            onClick={handleAddReviewClick}
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-full font-medium transition-colors shadow-md"
          >
            {user ? 'Add Your Review' : 'Give a review'}
          </button>
          {errorMsg && <p className="text-red-500 text-sm mt-2">{errorMsg}</p>}
        </div>

        {reviews.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reviews.map(r => (
              <div key={r.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-medium text-slate-900">{r.reviewerName}</h3>
                    <div className="flex items-center text-xs text-slate-500 mt-1">
                      <Calendar className="w-3 h-3 mr-1" />
                      {r.createdAt ? new Date(r.createdAt.seconds * 1000).toLocaleDateString() : 'Just now'}
                    </div>
                  </div>
                  {renderStars(r.rating)}
                </div>
                <p className="text-slate-700 text-sm leading-relaxed">{r.comment}</p>
              </div>
            ))}
          </div>
        )}

        {isModalOpen && (
          <div className="fixed inset-0 min-h-screen bg-slate-900/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl p-6 md:p-8 w-full max-w-md shadow-2xl relative">
              <button 
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <h3 className="text-2xl font-serif mb-6 text-slate-900">Write a Review</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Rating</label>
                  <div className="flex space-x-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="focus:outline-none focus:scale-110 transition-transform"
                      >
                        <Star 
                          className={`w-8 h-8 ${star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200 hover:text-yellow-200'}`} 
                        />
                      </button>
                    ))}
                  </div>
                </div>
                
                <div>
                  <label htmlFor="comment" className="block text-sm font-medium text-slate-700 mb-2">Your Experience</label>
                  <textarea
                    id="comment"
                    required
                    maxLength={1000}
                    rows={4}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition-all resize-none"
                    placeholder="Share details of your consultation..."
                  ></textarea>
                </div>
                
                {errorMsg && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-xl">
                    <p className="text-red-600 text-sm">{errorMsg}</p>
                  </div>
                )}

                <div className="flex items-center space-x-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 px-4 py-3 border border-slate-200 text-slate-700 font-medium rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 px-4 py-3 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Submitting...' : 'Submit'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
