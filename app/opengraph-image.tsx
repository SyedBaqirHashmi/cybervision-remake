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
    color: '#faf8f5',
    background: 'linear-gradient(120deg, #101010 30%, #252320)'
  }}>
  <div style={{
      display: 'flex',
      fontSize: 28,
      color: '#ead8b8'
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
      color: '#d0cbc3'
    }}>Software · Automation · IoT · Digital Training</div>
  </div>, size);
}
