import { Button } from "@/components/ui/button";
import { Clock, Users, Flame, ChefHat } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false); // <-- new
  const [scrollY, setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll("[data-scroll-animate]").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const clickSound = document.getElementById("click-sound") as HTMLAudioElement;
  
    const playSound = () => {
      if (clickSound) {
        clickSound.currentTime = 0; // restart the sound
        clickSound.play();
      }
    };
  
    document.addEventListener("mousedown", playSound);
  
    return () => document.removeEventListener("mousedown", playSound);
  }, []);

  // Detect mobile users
  useEffect(() => {
    const checkMobile = () => {
      const ua = navigator.userAgent;
      const mobile = /Mobi|Android|iPhone|iPad|iPod/i.test(ua);
      const smallScreen = window.innerWidth < 768;
      setIsMobile(mobile || smallScreen);
    };

    checkMobile(); // run on load
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // If mobile, show desktop-only message
  if (isMobile) {
    return (
      <div className="flex items-center justify-center min-h-screen text-center p-4 bg-[#8B2E2E] text-white">
        <div>
          <h1 className="text-3xl font-bold mb-4">Desktop Only</h1>
          <p className="text-lg">
            This site is optimized for desktop only. Please visit from a computer for the full access.
          </p>
        </div>
      </div>
    );
  }


  const ingredients = [
    { name: "Blazing Rice", amount: "3 cups", icon: "🍚" },
    { name: "Demon Chicken", amount: "1 lb", icon: "🍗" },
    { name: "Hellfire Sausage", amount: "1 lb", icon: "🌶️" },
    { name: "Shrimp of the Abyss", amount: "1 lb", icon: "🦐" },
    { name: "Fire Peppers", amount: "2 cups (mixed)", icon: "🫑" },
    { name: "Weeping Onions", amount: "2 large", icon: "🧅" },
    { name: "Cursed Celery", amount: "1 cup", icon: "🥬" },
    { name: "Vampiric Garlic", amount: "6 cloves", icon: "🧄" },
    { name: "Bloody Sauce", amount: "2 cups", icon: "🍅" },
    { name: "Infernal Broth", amount: "4 cups", icon: "🍲" },
    { name: "Spices of the Pit", amount: "2 tbsp", icon: "✨" },
    { name: "Molten Oil", amount: "3 tbsp", icon: "🫒" },
  ];

  const steps = [
  {
    number: 1,
    title: "Prepare the Fiends",
    description:
      "Dice the fire peppers, weeping onions, and cursed celery. Rend the demon chicken into bite sized morsels. Slice the hellfire sausage. Mince the vampiric garlic. Delightful chaos ! isn’t it?",
  },
  {
    number: 2,
    title: "Sizzle the Infernal Trinity",
    description:
      "Heat the molten oil in a grand cauldron. Sauté the fiery peppers, weeping onions, and cursed celery for 5-7 minutes until softened and fragrant. A symphony of sins!",
  },
  {
    number: 3,
    title: "Brown the Mortal Meats",
    description:
      "Add the demon chicken and hellfire sausage to your cauldron. Cook until gloriously browned, about 8-10 minutes. Toss in the vampiric garlic for one more minute of aromatic delight!",
  },
  {
    number: 4,
    title: "Infuse the Spices of the Pit",
    description:
      "Stir in the Cajun spices of the abyss and let them bloom for a minute. Ah, the scent of a thousand tormented souls dancing in harmony!",
  },
  {
    number: 5,
    title: "Concoct the Blood and Broth",
    description:
      "Pour in the blood sauce and infernal broth. Stir with wicked glee and bring to a simmer. Let it bubble for 15 minutes… patience, my little devils!",
  },
  {
    number: 6,
    title: "Summon the Blazing Rice",
    description:
      "Stir in the blazing rice, ensuring each grain is drenched in fiery goodness. Bring to a boil, then lower the heat to a slow, sinister simmer.",
  },
  {
    number: 7,
    title: "Simmer in the Depths",
    description:
      "Cover your cauldron and let the infernal concoction simmer for 20-25 minutes until the rice is tender and the liquid vanishes into nothingness. Delightful!",
  },
  {
    number: 8,
    title: "Add the Abyssal Shrimp and Revel",
    description:
      "Toss in the shrimp during the last 5 minutes of cooking. Season with the tears of the damned (salt and pepper) to taste. Serve piping hot, and watch your guests quake with delight! Haha!",
  },
];


  return (
    <div className="min-h-screen bg-gradient-to-b from-[#F5E6D3] via-[#F5E6D3] to-[#F9F3ED]">
      <audio id="click-sound" src="/click.mp3"></audio>
      {/* Navigation Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="container flex items-center justify-between py-4">
          <div className="flex items-end gap-2">
            <img
              src="/favicon.png" 
              alt="TopAl" 
              className="w-16 h-16"
            />
            <h1 className="text-2xl font-bold text-[#8B2E2E]">
              Jambalaya
            </h1>
          </div>

          <nav className="hidden md:flex gap-8">
            <a
              href="#ingredients"
              className="text-[#2C1810] hover:text-[#8B2E2E] transition-colors duration-300"
            >
              Ingredients
            </a>
            <a
              href="#instructions"
              className="text-[#2C1810] hover:text-[#8B2E2E] transition-colors duration-300"
            >
              Instructions
            </a>
            <a
              href="#tips"
              className="text-[#2C1810] hover:text-[#8B2E2E] transition-colors duration-300"
            >
              Tips
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section
        id="hero"
        className="relative overflow-hidden pt-12 pb-20 md:pt-20 md:pb-32"
      >
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Left side - Text */}
            <div
              className="scroll-fade-in"
              data-scroll-animate
              style={{
                opacity: Math.max(0, 1 - scrollY / 500),
                transform: `translateY(${scrollY * 0.3}px)`,
              }}
            >
              <div className="mb-6">
                <span className="accent-text text-lg">Alastor's Recipe</span>
              </div>
              <h1 className="text-5xl md:text-6xl font-bold text-[#8B2E2E] mb-6 leading-tight">
                Jambalaya
              </h1>
              <p className="text-xl text-[#5C4033] mb-8 leading-relaxed font-light">
                Oh, deer! My mother once showed me a wonderful recipe for Jambalaya. 
                 In fact, it nearly killed her! Haha, you could say the kick was right out of Hell… 
                 oh, I’m on a roll!
              </p>

              {/* Quick Info */}
              <div className="flex flex-wrap gap-6 mb-10">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#D4A574]" />
                  <span className="text-[#2C1810]">
                    <strong>45 min</strong> cook time
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5 text-[#D4A574]" />
                  <span className="text-[#2C1810]">
                    <strong>Serves 6</strong> hungry souls
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-[#D4A574]" />
                  <span className="text-[#2C1810]">
                    <strong>Hellish</strong> level
                  </span>
                </div>
              </div>

            </div>

            {/* Right side - Image */}
            <div
              className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl hover-lift"
              style={{
                transform: `translateY(${scrollY * 0.2}px)`,
              }}
            >
              <img
                src="/jambalaya-hero.jpg"
                alt="Delicious jambalaya dish"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#8B2E2E]/20"></div>
            </div>
          </div>
        </div>
        <img
          src="/Alastor.png" // <-- put the file in your public/ folder
          alt="Alastor"
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[380px] pointer-events-none select-none"
          style={{
            transform: `translate(-50%, ${scrollY * 0.25}px)`,
          }}
        />
      </section>

      {/* Ingredients Section */}
      <section
        id="ingredients"
        className="py-20 md:py-32 bg-white relative"
        data-scroll-animate
      >
        <div className="container relative z-10">
          <div className="mb-16 -translate-x-15">
            <span className="accent-text text-lg">What You'll Need</span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#8B2E2E] mt-2">
              Ingredients
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 -translate-x-20">
            {ingredients.map((ingredient, index) => (
              <div
                key={index}
                className="stagger-item bg-gradient-to-br from-[#F5E6D3] to-[#F9F3ED] p-6 rounded-xl hover-lift border border-[#E8D4C0]"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-[#2C1810]">
                      {ingredient.name}
                    </h3>
                    <p className="text-[#D4A574] font-medium">
                      {ingredient.amount}
                    </p>
                  </div>
                  <span className="text-3xl">{ingredient.icon}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <img
          src="/HumanAlastor.png"
          alt="Alastor Human"
          className="absolute bottom-0 right-0 translate-x-45 w-[500px] md:w-[650px] pointer-events-none select-none z-0"
        />
      </section>

      {/* Instructions Section */}
      <section
        id="instructions"
        className="py-20 md:py-32 bg-gradient-to-b from-[#F5E6D3] to-[#F9F3ED] relative overflow-visible"
        data-scroll-animate
      >
        <div className="container">
          <div className="mb-16">
            <span className="accent-text text-lg">Step by Step</span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#8B2E2E] mt-2">
              How to Make It
            </h2>
          </div>
        

          <div className="space-y-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="stagger-item grid grid-cols-1 md:grid-cols-3 gap-8 items-start"
              >
                <div className="flex items-center justify-center md:justify-start">
                  <div className="w-16 h-16 bg-[#8B2E2E] rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
                    {step.number}
                  </div>
                </div>
                <div className="md:col-span-2 bg-white p-8 rounded-xl shadow-md hover-lift border border-[#E8D4C0]">
                  <h3 className="text-2xl font-bold text-[#8B2E2E] mb-3">
                    {step.title}
                  </h3>
                  <p className="text-[#5C4033] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <img
          src="/AlastorInstructions.png"
          alt="Alastor Instructions"
          className="absolute bottom-0 left-0 w-[300px] md:w-[450px] pointer-events-none select-none z-20"
        />
      </section>

      {/* Tips Section */}
      <section
        id="tips"
        className="py-20 md:py-32 bg-white"
        data-scroll-animate
      >
        <div className="container">
          <div className="mb-16">
            <span className="accent-text text-lg">A Tip from Yours Truly… and Mother</span>
            <h2 className="text-4xl md:text-5xl font-bold text-[#8B2E2E] mt-2">
              Mother’s Secrets
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="stagger-item bg-gradient-to-br from-[#8B2E2E] to-[#6B1E1E] text-white p-8 rounded-xl shadow-lg hover-lift">
            <h3 className="text-2xl font-bold mb-4">The Infernal Trinity</h3>
            <p className="text-[#F5E6D3] leading-relaxed">
              The backbone of any devilish Jambalaya! Fire peppers, weeping onions, and cursed celery combine to create a scent so intoxicating, even the damned pause to inhale. Never skip this step!
            </p>
          </div>

          <div className="stagger-item bg-gradient-to-br from-[#D4A574] to-[#C49560] text-[#2C1810] p-8 rounded-xl shadow-lg hover-lift">
            <h3 className="text-2xl font-bold mb-4">Blazing Rice Selection</h3>
            <p className="leading-relaxed">
              Only long grain white rice will survive this infernal concoction with proper texture. Do not rinse the starchy grains will soak up all the fiery flavors like little molten sponges.
            </p>
          </div>

          <div className="stagger-item bg-gradient-to-br from-[#8B2E2E] to-[#6B1E1E] text-white p-8 rounded-xl shadow-lg hover-lift">
            <h3 className="text-2xl font-bold mb-4">Spice of the Pit</h3>
            <p className="text-[#F5E6D3] leading-relaxed">
             Begin with 2 tablespoons of Cajun spices from the pit, then adjust if you dare. Beware the flames of heat are merciless. Once in, they cannot be banished!
            </p>
          </div>

          <div className="stagger-item bg-gradient-to-br from-[#D4A574] to-[#C49560] text-[#2C1810] p-8 rounded-xl shadow-lg hover-lift">
            <h3 className="text-2xl font-bold mb-4">Shrimp of the Abyss</h3>
            <p className="leading-relaxed">
              Toss in the shrimp during the final 5 minutes of your infernal boil. Overcooked, they shriek with toughness. Watch for their pink transformation they signal readiness to join the feast of flames.
            </p>
          </div>
          </div>
        </div>
      </section>

      {/* Cooking Image Section */}
      <section
        className="py-20 md:py-32 bg-gradient-to-b from-[#F5E6D3] to-[#F9F3ED]"
        data-scroll-animate
      >
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative h-96 md:h-[450px] rounded-2xl overflow-hidden shadow-2xl hover-lift order-2 md:order-1">
              <img
                src="/jambalaya-cooking.jpg"
                alt="Jambalaya cooking process"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#8B2E2E]/20"></div>
            </div>

            <div className="order-1 md:order-2 scroll-fade-in" data-scroll-animate>
              <span className="accent-text text-lg">Alastor's Tips</span>
              <h2 className="text-4xl md:text-5xl font-bold text-[#8B2E2E] mt-2 mb-6">
                The Perfect One-Pot Meal
              </h2>
              <p className="text-lg text-[#5C4033] mb-6 leading-relaxed">
                Ah, Jambalaya! The ultimate little torment of comfort, all sizzling together in a single cauldron…
                 cleanup, a mere trifle! But ohhh, the beauty, my dear devils, is how each grain
                 of rice soaks up the wickedly spiced broth… a symphony of chaos and flavor,
                 all in one-pot. Niffty ! dont clean that pot my dear!
              </p>
              <ul className="space-y-4 mb-8">
                <li className="flex items-start gap-3">
                  <span className="text-[#D4A574] font-bold text-xl">✓</span>
                  <span className="text-[#2C1810]">
                    Don't stir too much. . . let it suffer in peace
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#D4A574] font-bold text-xl">✓</span>
                  <span className="text-[#2C1810]">
                    Keep the lid on to trap steam, perfect rice demands patience!
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#D4A574] font-bold text-xl">✓</span>
                  <span className="text-[#2C1810]">
                    Let it rest. . . five minutes, no more, no less.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#D4A574] font-bold text-xl">✓</span>
                  <span className="text-[#2C1810]">
                    Taste, adjust seasonings and enjoy a devilish bite, my dears!
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-[#8B2E2E] text-white relative overflow-visible">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        </div>
        <img
          src="/Alastor2.png"
          alt="Alastor2"
          className="absolute bottom-0 right-0 w-[290px] md:w-[370px] pointer-events-none select-none z-20"
          style={{ transform: `translate(0%, 0%)` }}
        />
        
        <div className="container relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to cook, my little devils?
          </h2>
          <p className="text-xl text-[#F5E6D3] mb-10 max-w-2xl mx-auto">
            Stir up a pot of pure delight! This Jambalaya will thrill, tantalize,
             and perhaps even frighten the taste buds of any daring soul!
          </p>
        </div>

      </section>

      {/* Footer */}
      <footer className="bg-[#2C1810] text-[#F5E6D3] py-12">
        <div className="container text-center">
          <p className="text-sm text-[#D4A574]">
            Made with love from Mama Alastor’s recipe
          </p>
        </div>
      </footer>
    </div>
  );
}
