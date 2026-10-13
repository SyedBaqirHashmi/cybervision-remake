/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: { extend: {
    colors: {
      obsidian: '#101010', midnight: '#1c1c1c',
      slate: {50:'#faf8f5',100:'#f2efea',200:'#e4e0d9',300:'#d0cbc3',400:'#b4aea5',500:'#8b857d',600:'#5e5953',700:'#413d38',800:'#302d29',900:'#1c1c1c',950:'#101010'},
      champagne: {50:'#faf5eb',100:'#f1e5cf',200:'#ead8b8',300:'#dfc596',400:'#cdb17b',500:'#b69760',600:'#937645',700:'#725b36',800:'#4c3d29',900:'#30281e',950:'#211d17'},
      bronze: {50:'#f8eee6',100:'#efd9c7',200:'#e2c3aa',300:'#ddbaa0',400:'#c39b79',500:'#af7a4f',600:'#95633e',700:'#704b32',800:'#513828',900:'#34271e',950:'#241d18'}
    },
    fontFamily: {sans:['Inter','Arial','sans-serif'],mono:['ui-monospace','SFMono-Regular','monospace']},
    fontSize: {display:['clamp(2.55rem, 6.6vw, 6.5rem)',{lineHeight:'1.03',letterSpacing:'-0.065em'}]},
    boxShadow: {glow:'0 6px 28px rgb(182 151 96 / .10)'},
    backgroundImage: {'accent-gradient':'linear-gradient(110deg,#ead8b8,#ddbaa0)'},
    keyframes: {'line-draw':{from:{strokeDashoffset:'1'},to:{strokeDashoffset:'0'}}},
    animation: {'line-draw':'line-draw 1.8s cubic-bezier(.22,1,.36,1) both'}
  }},
  plugins: []
};
