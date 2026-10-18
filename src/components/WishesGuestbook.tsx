import React, { useState, useEffect } from 'react';
import { WeddingConfig, GuestWish } from '../types/wedding';
import { Heart, Send, Sparkles, MessageCircleHeart } from 'lucide-react';

interface WishesGuestbookProps {
  config: WeddingConfig;
}

const INITIAL_WISHES: GuestWish[] = [
  {
    id: 'w1',
    name: 'Shamla & Ashique',
    relationship: 'Family & Cousins',
    message: 'Barakallahu lakuma wa baraka alaikuma! May Allah fill your home with immense happiness, endless peace, and sweet understanding.',
    likes: 18,
    date: 'Yesterday',
  },
  {
    id: 'w2',
    name: 'Dr. Irfan & Family',
    relationship: 'Well-wishers',
    message: 'Heartiest congratulations to Jasmina and Fayis! Wishing you a blessed lifetime of shared dreams, laughter, and spiritual harmony.',
    likes: 14,
    date: '2 days ago',
  },
  {
    id: 'w3',
    name: 'Amina & Haris',
    relationship: 'Dear Friends',
    message: 'So incredibly thrilled for you both! May your union be a beacon of love, kindness, and eternal barakah. Looking forward to the 14th of November!',
    likes: 23,
    date: '3 days ago',
  },
  {
    id: 'w4',
    name: 'Uncle Basheer & Family',
    relationship: 'Relatives, Mattara',
    message: 'Heartfelt prayers for our dear Jasmina and Fayis on this sacred milestone. May Allah grant you righteous offspring and an auspicious life.',
    likes: 19,
    date: '4 days ago',
  },
];

export const WishesGuestbook: React.FC<WishesGuestbookProps> = ({ config }) => {
  const [wishes, setWishes] = useState<GuestWish[]>(() => {
    try {
      const saved = localStorage.getItem('jasmina_fayis_wedding_wishes');
      return saved ? JSON.parse(saved) : INITIAL_WISHES;
    } catch {
      return INITIAL_WISHES;
    }
  });

  const [authorName, setAuthorName] = useState('');
  const [relationship, setRelationship] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      localStorage.setItem('jasmina_fayis_wedding_wishes', JSON.stringify(wishes));
    } catch {}
  }, [wishes]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!authorName.trim() || !message.trim()) return;

    const newWish: GuestWish = {
      id: Date.now().toString(),
      name: authorName.trim(),
      relationship: relationship.trim() || 'Well-wisher',
      message: message.trim(),
      likes: 1,
      date: 'Just now',
    };

    setWishes([newWish, ...wishes]);
    setAuthorName('');
    setRelationship('');
    setMessage('');
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const toggleLike = (id: string) => {
    const isLiked = likedMap[id];
    setLikedMap((prev) => ({ ...prev, [id]: !isLiked }));
    setWishes((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, likes: isLiked ? w.likes - 1 : w.likes + 1 } : w
      )
    );
  };

  return (
    <section id="wishes" className="py-16 sm:py-24 relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#99752b] font-medium block mb-1">
            Warm Prayers & Blessings
          </span>
          <h2 className="text-3xl sm:text-4xl font-serif text-[#3f0712] font-normal tracking-wide">
            Duas for the Couple
          </h2>
          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-[#cbaa55] to-transparent mx-auto my-3" />
          <p className="text-xs sm:text-sm font-serif italic text-[#741628] max-w-md mx-auto">
            Leave your sincere prayers, greetings, and warm blessings for Jasmina and Fayis.
          </p>
        </div>

        {/* 2-Column: Form on left, Wishes stream on right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Wish Submission Form */}
          <div className="lg:col-span-5 bg-[#fffefc] border border-[#dec177]/80 rounded-2xl p-6 sm:p-8 shadow-xs">
            <div className="flex items-center gap-2 mb-4 text-[#741628]">
              <MessageCircleHeart className="w-5 h-5 text-[#99752b]" />
              <h3 className="font-serif text-lg font-medium text-[#3f0712]">
                Send a Prayer or Blessing
              </h3>
            </div>

            {submitted && (
              <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-xl text-xs font-serif text-center">
                ✨ JazakAllahu Khairan! Your beautiful dua has been shared on the wedding wall.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4 font-serif">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#6b1024] font-medium mb-1">
                  Your Full Name <span className="text-[#84162e]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tariq & Family"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#dec177]/60 rounded-xl focus:outline-none focus:border-[#99752b] text-[#3f0712]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#6b1024] font-medium mb-1">
                  Relationship / Relation (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Friend, Cousin, Colleague"
                  value={relationship}
                  onChange={(e) => setRelationship(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#dec177]/60 rounded-xl focus:outline-none focus:border-[#99752b] text-[#3f0712]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#6b1024] font-medium mb-1">
                  Your Prayer / Message <span className="text-[#84162e]">*</span>
                </label>
                <textarea
                  required
                  rows={3}
                  placeholder="May Allah shower endless happiness, unity, and goodness..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full px-3.5 py-2 text-sm bg-[#faf7f2] border border-[#dec177]/60 rounded-xl focus:outline-none focus:border-[#99752b] text-[#3f0712] resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full gold-shimmer-btn text-white text-xs uppercase tracking-wider font-medium shadow-sm hover:scale-102 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5 text-[#dec177]" />
                <span>Post Blessing on Wall</span>
              </button>
            </form>
          </div>

          {/* Wishes Stream */}
          <div className="lg:col-span-7 space-y-4 max-h-[520px] overflow-y-auto pr-1">
            {wishes.map((wish) => (
              <div
                key={wish.id}
                className="bg-[#fffefc] border border-[#dec177]/60 rounded-2xl p-5 shadow-xs transition-shadow hover:border-[#cbaa55] font-serif"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <h4 className="font-semibold text-sm text-[#3f0712]">{wish.name}</h4>
                    <span className="text-[11px] text-[#99752b] tracking-wide">
                      {wish.relationship} · {wish.date}
                    </span>
                  </div>

                  <button
                    onClick={() => toggleLike(wish.id)}
                    className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs transition-colors cursor-pointer ${
                      likedMap[wish.id]
                        ? 'bg-[#fcf0f2] text-[#84162e] border border-[#dec177]/60 font-semibold'
                        : 'bg-[#faf7f2] text-[#6b1024] hover:bg-[#fcf0f2]'
                    }`}
                    title="Send a heart"
                  >
                    <Heart
                      className={`w-3.5 h-3.5 ${
                        likedMap[wish.id]
                          ? 'fill-[#84162e] text-[#84162e]'
                          : 'text-[#99752b]'
                      }`}
                    />
                    <span className="tabular-nums text-[11px]">{wish.likes}</span>
                  </button>
                </div>

                <p className="text-xs sm:text-sm text-[#6b1024] leading-relaxed italic">
                  "{wish.message}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
