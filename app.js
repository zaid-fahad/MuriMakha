import React, { useState, useEffect, useMemo } from 'react';
import { 
  Users, 
  Flame, 
  ChefHat, 
  Check, 
  X, 
  ShoppingBag,
  Zap,
  Leaf,
  Droplet,
  Utensils
} from 'lucide-react';

const MuriMakhaPop = () => {
  // --- STATE ---
  const [people, setPeople] = useState(4);
  const [selectedRecipe, setSelectedRecipe] = useState('street');
  const [customizations, setCustomizations] = useState({});

  // --- DATA ---
  const recipes = {
    street: {
      id: 'street',
      name: 'Street Classic',
      icon: <Zap size={20} />,
      color: 'bg-orange-500',
      desc: 'The original tong-er-dokan taste.',
      defaultItems: ['muri', 'chanachur', 'onion', 'chili', 'oil', 'lemon', 'masala', 'dhonia']
    },
    loaded: {
      id: 'loaded',
      name: 'Royal Feast',
      icon: <ChefHat size={20} />,
      color: 'bg-purple-600',
      desc: 'Chicken, chickpeas & everything rich.',
      defaultItems: ['muri', 'chanachur', 'onion', 'chili', 'oil', 'lemon', 'masala', 'dhonia', 'chicken', 'chola', 'tomato', 'piyaju']
    },
    hostel: {
      id: 'hostel',
      name: 'Hostel Night',
      icon: <Flame size={20} />,
      color: 'bg-slate-700',
      desc: 'Survival mode. Just the basics.',
      defaultItems: ['muri', 'chanachur', 'oil', 'onion', 'chili']
    }
  };

  const ingredientsDB = [
    // Base
    { id: 'muri', name: 'Muri', category: 'base', baseQty: 60, unit: 'g', packSize: 500, packUnit: 'pkt' },
    
    // Crunch
    { id: 'chanachur', name: 'Chanachur', category: 'crunch', baseQty: 25, unit: 'g', packSize: 150, packUnit: 'pkt' },
    { id: 'piyaju', name: 'Piyaju', category: 'crunch', baseQty: 2, unit: 'pcs' },
    { id: 'chips', name: 'Potato Chips', category: 'crunch', baseQty: 0.5, unit: 'pkt' },
    
    // Fresh
    { id: 'onion', name: 'Onion', category: 'fresh', baseQty: 0.5, unit: 'med' },
    { id: 'chili', name: 'Gr. Chili', category: 'fresh', baseQty: 2, unit: 'pcs' },
    { id: 'tomato', name: 'Tomato', category: 'fresh', baseQty: 0.25, unit: 'med' },
    { id: 'cucumber', name: 'Cucumber', category: 'fresh', baseQty: 0.25, unit: 'lg' },
    { id: 'dhonia', name: 'Dhonia', category: 'fresh', baseQty: 0.1, unit: 'bunch' },
    
    // Wet/Spice
    { id: 'oil', name: 'Mustard Oil', category: 'wet', baseQty: 0.75, unit: 'tbsp' },
    { id: 'lemon', name: 'Lemon', category: 'wet', baseQty: 0.25, unit: 'pcs' },
    { id: 'masala', name: 'Chaat Masala', category: 'wet', baseQty: 0.5, unit: 'tsp' },
    
    // Heavy
    { id: 'chicken', name: 'Chicken', category: 'heavy', baseQty: 50, unit: 'g' },
    { id: 'chola', name: 'Boiled Chola', category: 'heavy', baseQty: 30, unit: 'g' },
    { id: 'egg', name: 'Boiled Egg', category: 'heavy', baseQty: 0.5, unit: 'pcs' },
  ];

  // --- LOGIC ---
  
  // Reset customizations when recipe changes
  useEffect(() => {
    const defaults = {};
    const recipeItems = recipes[selectedRecipe].defaultItems;
    
    ingredientsDB.forEach(item => {
      defaults[item.id] = recipeItems.includes(item.id);
    });
    setCustomizations(defaults);
  }, [selectedRecipe]);

  const toggleIng = (id) => {
    setCustomizations(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const calculate = (item) => {
    const totalRaw = item.baseQty * people;
    
    if (item.packSize) {
      const packs = (totalRaw / item.packSize).toFixed(1);
      // If packs is close to integer, show integer
      const prettyPacks = packs.endsWith('.0') ? parseInt(packs) : packs;
      const displayGrams = totalRaw >= 1000 ? `${(totalRaw/1000).toFixed(1)}kg` : `${Math.ceil(totalRaw)}g`;
      return `${displayGrams} (${prettyPacks} ${item.packUnit})`;
    }
    
    if (totalRaw < 1) return totalRaw.toFixed(1);
    return Math.ceil(totalRaw);
  };

  // --- RENDER HELPERS ---
  const activeIngredients = ingredientsDB.filter(i => customizations[i.id]);
  const totalPrice = people * 40; // Fake price algo for fun UI

  return (
    <div className="min-h-screen font-sans bg-[#FDF6E3] text-[#2c2c2c] selection:bg-[#F59E0B] selection:text-white pb-12">
      
      {/* BACKGROUND PATTERN (Muri Texture) */}
      <div className="fixed inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#F59E0B 1.5px, transparent 1.5px)', backgroundSize: '24px 24px' }}>
      </div>

      <div className="relative max-w-6xl mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* === HEADER === */}
        <div className="lg:col-span-12 flex items-center justify-between mb-2">
          <div className="bg-[#2c2c2c] text-[#F59E0B] px-6 py-3 rounded-tr-2xl rounded-bl-2xl shadow-neo transform -rotate-1">
            <h1 className="text-3xl font-black tracking-tighter uppercase italic">Muri<span className="text-white">Makha</span></h1>
          </div>
          <div className="hidden md:flex gap-2">
            <div className="w-4 h-4 rounded-full bg-[#F59E0B] animate-pulse"></div>
            <div className="w-4 h-4 rounded-full bg-[#EF4444] animate-bounce delay-100"></div>
            <div className="w-4 h-4 rounded-full bg-[#10B981] animate-pulse delay-200"></div>
          </div>
        </div>

        {/* === LEFT COLUMN: CONTROLS === */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* STAGE 1: THE SQUAD (People) */}
          <section className="bg-[#F59E0B] p-6 rounded-3xl shadow-neo border-4 border-[#2c2c2c] relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-4 opacity-20 transform rotate-12 group-hover:scale-110 transition-transform">
              <Users size={120} color="black" />
            </div>
            
            <h2 className="text-xl font-black uppercase tracking-wide text-[#2c2c2c] mb-4 flex items-center gap-2">
              <span className="bg-[#2c2c2c] text-[#F59E0B] w-8 h-8 flex items-center justify-center rounded-full text-sm">1</span>
              The Squad Size
            </h2>
            
            <div className="flex items-center gap-6 relative z-10">
              <button 
                onClick={() => setPeople(Math.max(1, people - 1))}
                className="w-16 h-16 bg-white rounded-xl border-4 border-[#2c2c2c] shadow-[4px_4px_0px_0px_rgba(44,44,44,1)] active:translate-y-1 active:shadow-none flex items-center justify-center text-4xl font-bold hover:bg-gray-100 transition-all"
              >
                -
              </button>
              <div className="flex-1 bg-[#2c2c2c] rounded-xl p-2 text-center transform -skew-x-6">
                <span className="text-5xl font-black text-white block transform skew-x-6">{people}</span>
                <span className="text-xs font-bold text-[#F59E0B] uppercase tracking-widest block transform skew-x-6">Hungry Humans</span>
              </div>
              <button 
                onClick={() => setPeople(people + 1)}
                className="w-16 h-16 bg-white rounded-xl border-4 border-[#2c2c2c] shadow-[4px_4px_0px_0px_rgba(44,44,44,1)] active:translate-y-1 active:shadow-none flex items-center justify-center text-4xl font-bold hover:bg-gray-100 transition-all"
              >
                +
              </button>
            </div>
          </section>

          {/* STAGE 2: THE VIBE (Recipes) */}
          <section className="bg-white p-6 rounded-3xl shadow-neo border-2 border-[#2c2c2c]">
            <h2 className="text-xl font-black uppercase tracking-wide text-[#2c2c2c] mb-4 flex items-center gap-2">
              <span className="bg-[#2c2c2c] text-white w-8 h-8 flex items-center justify-center rounded-full text-sm">2</span>
              Pick The Vibe
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Object.values(recipes).map((recipe) => (
                <button
                  key={recipe.id}
                  onClick={() => setSelectedRecipe(recipe.id)}
                  className={`
                    relative p-4 rounded-xl border-2 text-left transition-all duration-200
                    ${selectedRecipe === recipe.id 
                      ? `border-[#2c2c2c] shadow-[4px_4px_0px_0px_rgba(44,44,44,1)] scale-[1.02] bg-[#FFFBEB]` 
                      : 'border-gray-200 hover:border-[#2c2c2c] hover:bg-gray-50 opacity-70 hover:opacity-100'}
                  `}
                >
                  <div className={`${recipe.color} w-10 h-10 rounded-lg text-white flex items-center justify-center mb-3 shadow-sm`}>
                    {recipe.icon}
                  </div>
                  <h3 className="font-bold text-lg leading-none mb-1">{recipe.name}</h3>
                  <p className="text-xs text-gray-500 font-medium leading-tight">{recipe.desc}</p>
                  
                  {selectedRecipe === recipe.id && (
                    <div className="absolute top-2 right-2 bg-[#2c2c2c] text-[#F59E0B] rounded-full p-1">
                      <Check size={12} strokeWidth={4} />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </section>

          {/* STAGE 3: THE STASH (Ingredients) */}
          <section className="bg-white p-6 rounded-3xl shadow-neo border-2 border-[#2c2c2c]">
            <h2 className="text-xl font-black uppercase tracking-wide text-[#2c2c2c] mb-4 flex items-center gap-2">
              <span className="bg-[#2c2c2c] text-white w-8 h-8 flex items-center justify-center rounded-full text-sm">3</span>
              What's In The Kitchen?
            </h2>
            
            <div className="flex flex-wrap gap-2">
              {ingredientsDB.map((ing) => {
                const isActive = customizations[ing.id];
                return (
                  <button
                    key={ing.id}
                    onClick={() => toggleIng(ing.id)}
                    className={`
                      px-4 py-2 rounded-full border-2 font-bold text-sm transition-all flex items-center gap-2
                      ${isActive 
                        ? 'bg-[#2c2c2c] text-white border-[#2c2c2c]' 
                        : 'bg-white text-gray-400 border-gray-200 hover:border-gray-400'}
                    `}
                  >
                    {isActive ? <Check size={14} /> : <X size={14} />}
                    {ing.name}
                  </button>
                );
              })}
            </div>
          </section>
        </div>

        {/* === RIGHT COLUMN: RECEIPT === */}
        <div className="lg:col-span-5 relative">
          <div className="sticky top-6">
            
            {/* The Receipt Paper */}
            <div className="bg-white relative mx-auto w-full max-w-md filter drop-shadow-xl transform rotate-1 transition-transform hover:rotate-0 duration-300">
              
              {/* Jagged Top */}
              <div 
                className="absolute -top-3 left-0 w-full h-4 bg-white"
                style={{ 
                  clipPath: 'polygon(0% 100%, 5% 0%, 10% 100%, 15% 0%, 20% 100%, 25% 0%, 30% 100%, 35% 0%, 40% 100%, 45% 0%, 50% 100%, 55% 0%, 60% 100%, 65% 0%, 70% 100%, 75% 0%, 80% 100%, 85% 0%, 90% 100%, 95% 0%, 100% 100%)' 
                }}
              ></div>

              <div className="p-8 pb-12 text-[#2c2c2c] font-mono text-sm leading-relaxed">
                <div className="text-center border-b-2 border-dashed border-gray-300 pb-6 mb-6">
                  <h2 className="text-3xl font-black uppercase tracking-widest mb-1">FINAL MIX</h2>
                  <p className="text-gray-500 uppercase tracking-wide">Ratio Calculator v3.0</p>
                  <p className="mt-2 font-bold text-lg">Serving: {people} PAX</p>
                  <div className="inline-block bg-[#F59E0B] text-[#2c2c2c] text-xs font-bold px-2 py-1 mt-2 transform -rotate-2">
                    {recipes[selectedRecipe].name} Style
                  </div>
                </div>

                <div className="space-y-3">
                  {activeIngredients.map((item) => (
                    <div key={item.id} className="flex justify-between items-baseline group">
                      <span className="font-bold relative z-10 bg-white pr-2 group-hover:text-[#F59E0B] transition-colors">
                        {item.name}
                      </span>
                      <span className="flex-1 border-b border-dotted border-gray-300 mx-1 relative -top-1"></span>
                      <span className="font-black text-lg">{calculate(item)}</span>
                    </div>
                  ))}
                </div>

                {activeIngredients.length === 0 && (
                  <div className="text-center py-10 text-gray-400 italic">
                    You removed everything!<br/>Just eating air?
                  </div>
                )}

                <div className="mt-8 pt-6 border-t-2 border-black border-dashed">
                   <div className="flex justify-between items-center bg-[#FDF6E3] p-4 border-2 border-[#2c2c2c] rounded-lg">
                      <div className="flex flex-col">
                        <span className="text-xs uppercase font-bold text-gray-500">Muri Required</span>
                        <span className="font-black text-2xl text-[#2c2c2c]">{calculate(ingredientsDB[0])}</span>
                      </div>
                      <Utensils className="text-[#F59E0B]" size={32} />
                   </div>
                </div>

                <div className="mt-8 text-center opacity-50 text-xs">
                  <p>**********************************</p>
                  <p>MIX WELL BEFORE SERVING</p>
                  <p>ENJOY THE CRUNCH</p>
                  <p>**********************************</p>
                </div>

                {/* Barcode Mockup */}
                <div className="h-12 w-3/4 mx-auto mt-6 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/UPC-A-036000291452.svg/1200px-UPC-A-036000291452.svg.png')] bg-cover opacity-60 grayscale"></div>

              </div>

              {/* Jagged Bottom */}
              <div 
                className="absolute -bottom-3 left-0 w-full h-4 bg-white"
                style={{ 
                  clipPath: 'polygon(0% 0%, 5% 100%, 10% 0%, 15% 100%, 20% 0%, 25% 100%, 30% 0%, 35% 100%, 40% 0%, 45% 100%, 50% 0%, 55% 100%, 60% 0%, 65% 100%, 70% 0%, 75% 100%, 80% 0%, 85% 100%, 90% 0%, 95% 100%, 100% 0%)' 
                }}
              ></div>
            </div>
            
          </div>
        </div>

      </div>
    </div>
  );
};

export default MuriMakhaPop;
