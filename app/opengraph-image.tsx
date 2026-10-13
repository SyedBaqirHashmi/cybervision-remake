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
    color: '#fbf8f1',
    background: 'linear-gradient(120deg, #0b0a08 30%, #3f2d14)'
  }}>
  <div style={{
      display: 'flex',
      fontSize: 28,
      color: '#e9d4a0'
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
      color: '#d6d3d1'
    }}>Software · Automation · IoT · Digital Training</div>
  </div>, size);
}
