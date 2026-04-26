import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, onSnapshot, query, orderBy, setDoc, doc, serverTimestamp, Timestamp } from 'firebase/firestore';
import { GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth';
import { handleFirestoreError, OperationType } from '../firebaseUtils';
import { Star } from 'lucide-react';

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
  const [showAllReviews, setShowAllReviews] = useState(false);

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
        if (err.code === 'auth/unauthorized-domain') {
            setErrorMsg('Error: Unauthorized domain. Please add these domains to Firebase Console > Authentication > Settings > Authorized Domains: ais-dev-6r5ti66zlsjzl7uewpiuvp-234380975154.asia-southeast1.run.app AND ais-pre-6r5ti66zlsjzl7uewpiuvp-234380975154.asia-southeast1.run.app');
        } else {
            setErrorMsg(`Login Error: ${err.message}. If popups are blocked, please open this in a new tab.`);
        }
      }
    }
  };

  const handleAddReviewClick = () => {
    if (user) {
      const existingReview = reviews.find(r => r.reviewerId === user.uid);
      if (existingReview) {
        setRating(existingReview.rating);
        setComment(existingReview.comment || '');
      } else {
        setRating(5);
        setComment('');
      }
    } else {
      setRating(5);
      setComment('');
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let currentUser = user;

    if (!currentUser) {
        setErrorMsg('');
        try {
          const provider = new GoogleAuthProvider();
          await signInWithPopup(auth, provider);
          currentUser = auth.currentUser;
        } catch (err: any) {
          if (err.code === 'auth/popup-closed-by-user') {
            console.log('Sign in cancelled by user');
          } else {
            console.error('Login error:', err);
            if (err.code === 'auth/unauthorized-domain') {
              setErrorMsg('Error: Unauthorized domain. Please add these domains to Firebase Console > Authentication > Settings > Authorized Domains: ais-dev-6r5ti66zlsjzl7uewpiuvp-234380975154.asia-southeast1.run.app AND ais-pre-6r5ti66zlsjzl7uewpiuvp-234380975154.asia-southeast1.run.app');
            } else {
              setErrorMsg(`Login Error: ${err.message}. If popups are blocked, please open this in a new tab.`);
            }
          }
          return;
        }
    }

    if (!currentUser) return;

    setSubmitting(true);
    try {
      const existingReview = reviews.find(r => r.reviewerId === currentUser!.uid);
      const reviewRef = doc(db, 'reviews', currentUser.uid);

      if (existingReview) {
        await setDoc(reviewRef, {
          reviewerId: currentUser.uid,
          reviewerName: currentUser.displayName || 'Anonymous User',
          rating,
          comment,
        }, { merge: true });
      } else {
        await setDoc(reviewRef, {
          reviewerId: currentUser.uid,
          reviewerName: currentUser.displayName || 'Anonymous User',
          rating,
          comment,
          createdAt: serverTimestamp()
        });
      }
      setIsModalOpen(false);
    } catch (error) {
      handleFirestoreError(error, OperationType.WRITE, `reviews/${currentUser.uid}`);
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

  const baseRatingsCount = 28;
  const baseAvgRating = 4.9;
  
  let faizCount = 0;
  const validDbReviews = reviews.filter(r => {
    if (r.reviewerName.toLowerCase().includes('faiz akram')) {
      faizCount++;
      return faizCount === 1;
    }
    return true;
  });
  const dbRatingsCount = validDbReviews.length;
  
  const totalRatings = baseRatingsCount + dbRatingsCount;
  const totalRatingSum = (baseRatingsCount * baseAvgRating) + validDbReviews.reduce((sum, r) => sum + r.rating, 0);
  const averageRating = (totalRatingSum / totalRatings).toFixed(1);

  const staticReviews = [
    {
      id: "static-1",
      reviewerId: "static-1",
      reviewerName: "Priya Sharma",
      comment: "Dr. Shivrani is amazing! She patiently listened to all my issues and the medicines worked wonders for my PCOS.",
      rating: 5,
      createdAt: null,
    },
    {
      id: "static-2",
      reviewerId: "static-2",
      reviewerName: "Rahul Verma",
      comment: "I had severe skin allergies for years. After 3 months of homeopathic treatment, I am almost completely cured. Highly recommend!",
      rating: 5,
      createdAt: null,
    },
    {
      id: "static-3",
      reviewerId: "static-3",
      reviewerName: "Sunita Devi",
      comment: "Very convenient online consultation. The medicines were delivered on time and my child's immunity has significantly improved.",
      rating: 5,
      createdAt: null,
    }
  ];

  const dbReviewsWithComments = validDbReviews.filter(r => r.comment && r.comment.trim() !== '');
  const dbReviewsWithoutComments = validDbReviews.filter(r => !r.comment || r.comment.trim() === '');
  
  const displayReviews = [...staticReviews, ...dbReviewsWithComments, ...dbReviewsWithoutComments];
  const visibleReviews = showAllReviews ? displayReviews : displayReviews.slice(0, 3);
  const userHasReviewed = user ? validDbReviews.some(r => r.reviewerId === user.uid) : false;

  return (
    <section className="py-16 bg-slate-50" id="reviews">
      <div className="max-w-7xl mx-auto px-4 md:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-serif text-slate-900 mb-4 tracking-tight">Patient Reviews</h2>
          <p className="text-slate-600 max-w-2xl mx-auto text-lg mb-6">Hear what our patients have to say about their healing journey.</p>
          
          <div className="flex flex-col items-center justify-center gap-2 mb-8">
            <div className="flex items-center space-x-3">
              <span className="text-4xl font-bold text-slate-900">{averageRating}</span>
              <div className="flex flex-col items-start">
                {renderStars(Math.round(Number(averageRating)))}
                <span className="text-sm text-slate-500 mt-1">Based on {totalRatings} {totalRatings === 1 ? 'review' : 'reviews'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-end mb-8">
          <button 
            onClick={handleAddReviewClick}
            className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-full font-medium transition-colors shadow-md"
          >
            {userHasReviewed ? 'Edit Your Review' : (user ? 'Add Your Review' : 'Give a review')}
          </button>
          {errorMsg && <p className="text-red-500 text-sm mt-2">{errorMsg}</p>}
        </div>

        {visibleReviews.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleReviews.map(r => (
              <div key={r.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-medium text-slate-900">{r.reviewerName}</h3>
                    <div className="flex items-center text-xs text-slate-500 mt-1">
                      Patient Review
                    </div>
                  </div>
                  {renderStars(r.rating)}
                </div>
                {r.comment && <p className="text-slate-700 text-sm leading-relaxed">{r.comment}</p>}
              </div>
            ))}
          </div>
        )}

        {displayReviews.length > 3 && (
          <div className="text-center mt-10">
            <button 
              onClick={() => setShowAllReviews(!showAllReviews)}
              className="inline-flex items-center justify-center px-6 py-3 border border-primary-200 text-primary-700 font-medium rounded-xl hover:bg-primary-50 hover:border-primary-300 transition-colors"
            >
              {showAllReviews ? 'Show Less' : 'View More Reviews'}
            </button>
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
              
              <h3 className="text-2xl font-serif mb-6 text-slate-900">{userHasReviewed ? 'Edit Your Review' : 'Write a Review'}</h3>
              
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
                  <label htmlFor="comment" className="block text-sm font-medium text-slate-700 mb-2">Your Experience (Optional)</label>
                  <textarea
                    id="comment"
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
