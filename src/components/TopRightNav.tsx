import React from 'react';
import Points from '../assets/icons/Points.png';
import LightMode from '../assets/icons/Light mode.png';
import Settings from '../assets/icons/Settings.png';
import Ellipse2 from '../assets/images/Ellipse 2.png';

interface TopRightNavProps {
  credits?: string;
  onLightModeToggle?: () => void;
  onSettingsClick?: () => void;
  onProfileClick?: () => void;
  style?: React.CSSProperties;
}

const TopRightNav: React.FC<TopRightNavProps> = ({
  credits = "500/1000 Credits",
  onLightModeToggle,
  onSettingsClick,
  onProfileClick,
  style
}) => {
  return (
    <div style={{
      position: 'fixed',
      top: '24px',
      right: '24px',
      display: 'flex',
      alignItems: 'center',
      gap: '16px',
      zIndex: 1000,
      ...style
    }}>
      {/* Credits */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '12px 16px',
        backgroundColor: '#fff',
        borderRadius: '50px',
        fontSize: '16px',
        fontWeight: '500',
        color: '#374151',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)'
      }}>
        <img src={Points} alt="Points" style={{ width: '20px', height: '20px' }} />
        {credits}
      </div>

      {/* Light Mode Toggle */}
      <button 
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          backgroundColor: '#fff',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)'
        }}
        onClick={onLightModeToggle}
      >
        <img src={LightMode} alt="Light Mode" style={{ width: '28px', height: '28px', opacity: '0.7' }} />
      </button>

      {/* Settings Button */}
      <button 
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          backgroundColor: '#fff',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)'
        }}
        onClick={onSettingsClick}
      >
        <img src={Settings} alt="Settings" style={{ width: '24px', height: '24px', opacity: '0.7' }} />
      </button>

      {/* User Profile */}
      <div 
        style={{
          width: '48px',
          height: '48px',
          borderRadius: '50%',
          overflow: 'hidden',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
          cursor: 'pointer'
        }}
        onClick={onProfileClick}
      >
        <img src={Ellipse2} alt="Profile" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
    </div>
  );
};

export default TopRightNav;
