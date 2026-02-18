'use client'

export default function ProductImage({ src, alt, gender, category, className = '' }) {
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Background layer based on category and gender */}
      {category === 'Fragrance' && gender === 'Female' && (
        <>
          {/* Baby pink background with rose petals */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, #FFE4E1 0%, #FFB6C1 50%, #FFC0CB 100%)',
            }}
          />
          {/* Rose petals pattern overlay */}
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='150' height='150' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23FFB6C1' opacity='0.6'%3E%3Cpath d='M30 40 Q40 30 50 40 T70 40'/%3E%3Cpath d='M100 100 Q110 90 120 100 T140 100'/%3E%3Cpath d='M20 80 Q30 70 40 80 T60 80'/%3E%3Cpath d='M120 20 Q130 10 140 20 T160 20'/%3E%3Cpath d='M50 120 Q60 110 70 120 T90 120'/%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '150px 150px',
              backgroundRepeat: 'repeat',
            }}
          />
        </>
      )}
      
      {category === 'Fragrance' && gender === 'Male' && (
        <>
          {/* Dark coal background */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 30%, #1a1a1a 70%, #0d0d0d 100%)',
            }}
          />
          {/* Subtle texture overlay */}
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='100' height='100' fill='%23000'/%3E%3Cpath d='M0 0 L100 100 M100 0 L0 100' stroke='%23333' stroke-width='0.5'/%3E%3C/svg%3E")`,
              backgroundSize: '50px 50px',
            }}
          />
        </>
      )}
      
      {category === 'Accessories' && (
        <>
          {/* Baby pink background for accessories */}
          <div 
            className="absolute inset-0"
            style={{
              background: 'linear-gradient(135deg, #FFE4E1 0%, #FFB6C1 100%)',
            }}
          />
        </>
      )}

      {/* Product image */}
      <img
        src={src}
        alt={alt}
        className="relative w-full h-full object-cover"
        style={{
          mixBlendMode: category === 'Fragrance' && gender === 'Female' ? 'multiply' : 
                       category === 'Fragrance' && gender === 'Male' ? 'normal' : 
                       category === 'Accessories' ? 'multiply' : 'normal',
          opacity: category === 'Fragrance' && gender === 'Male' ? '0.85' : 
                   category === 'Accessories' ? '0.9' : '1',
        }}
      />
    </div>
  )
}
