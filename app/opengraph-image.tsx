import { ImageResponse } from 'next/og';
export const alt = 'CyberVision International — Architecting the Intelligent Enterprise';
export const size = {
  width: 1200,
  height: 630
};
export const contentType = 'image/png';
export default function Image() {
  return new ImageResponse(<div style={{
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    padding: 70,
    color: '#f8fafc',
    background: 'linear-gradient(120deg, #030712 30%, #172554)'
  }}>
  <div style={{
      display: 'flex',
      fontSize: 28,
      color: '#a5f3fc'
    }}>CYBERVISION INTERNATIONAL</div>
  <div style={{
      display: 'flex',
      maxWidth: 980,
      fontSize: 82,
      fontWeight: 700,
      letterSpacing: -5,
      lineHeight: 1.08
    }}>Architecting the Intelligent Enterprise.</div>
  <div style={{
      display: 'flex',
      fontSize: 22,
      color: '#cbd5e1'
    }}>Software · Automation · IoT · Digital Training</div>
  </div>, size);
}
