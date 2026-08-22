import { StarIcon } from '@heroicons/react/24/solid';
import reviewsData from '../data/review.json';

export default function GoogleReviews() {
  return (
    <div className="w-full space-y-10">
      
      {/* HEADER DE RESEÑAS */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-200/60 pb-6">
        <div>
          <span className="text-xs uppercase tracking-[0.3em] text-[#B5A447] font-black">
            Experiencias Reales
          </span>
          <h3 className="text-2xl sm:text-3xl font-light text-stone-800">
            Lo que dicen nuestros clientes en <span className="font-semibold text-stone-900">Google Maps</span>
          </h3>
        </div>

        <div className="flex items-center gap-3 bg-white px-5 py-3 rounded-full border border-stone-200/80 shadow-sm self-start sm:self-auto">
          <span className="text-xl font-bold text-stone-800">{reviewsData.rating.toFixed(1)}</span>
          <div className="flex text-[#D4C363]">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} className="h-5 w-5 fill-current" />
            ))}
          </div>
          <span className="text-xs text-stone-500 font-medium">({reviewsData.totalReviews} opiniones)</span>
        </div>
      </div>

      {/* CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 w-full">
        {reviewsData.reviews.map((review, idx) => (
          <div
            key={idx}
            className="p-8 rounded-[2.5rem] bg-white border border-stone-200/60 shadow-sm space-y-6 flex flex-col justify-between hover:shadow-xl hover:-translate-y-1 transition-all duration-500"
          >
            <div className="space-y-4">
              <div className="flex text-[#D4C363]">
                {[...Array(review.rating)].map((_, i) => (
                  <StarIcon key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="text-stone-600 italic text-sm sm:text-base leading-relaxed font-normal">
                "{review.text}"
              </p>
            </div>

            <div className="flex items-center gap-4 pt-4 border-t border-stone-100">
              <img
                src={review.profile_photo_url}
                alt={review.author_name}
                className="w-11 h-11 rounded-full object-cover border border-stone-200"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(review.author_name)}&background=2897A3&color=fff`;
                }}
              />
              <div>
                <h4 className="text-sm font-bold text-stone-800">{review.author_name}</h4>
                <span className="text-xs text-stone-400 font-light">{review.relative_time_description} — Google Maps</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}