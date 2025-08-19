import React from 'react';

interface SocialShareProps {
  title: string;
  description: string;
  socialCaption?: string;
  url: string;
}

// Function to convert markdown-like text to plain text for social media
const convertMarkdownToText = (text: string): string => {
  return text
    // Remove markdown links [text](url) -> text
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    // Remove markdown bold **text** -> text
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    // Remove markdown italic *text* -> text
    .replace(/\*([^*]+)\*/g, '$1')
    // Remove markdown code `text` -> text
    .replace(/`([^`]+)`/g, '$1')
    // Clean up extra spaces
    .replace(/\s+/g, ' ')
    .trim();
};

const SocialShare: React.FC<SocialShareProps> = ({ title, description, socialCaption, url }) => {
  const cleanSocialCaption = socialCaption ? convertMarkdownToText(socialCaption) : description;
  
  const handleInstagramShare = async () => {
    const text = `${cleanSocialCaption} ${url}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: cleanSocialCaption,
          url
        });
      } catch (err) {
        // User cancelled sharing
      }
    } else {
      try {
        await navigator.clipboard.writeText(text);
        alert('Caption copied! You can now paste it on Instagram.');
      } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Caption copied! You can now paste it on Instagram.');
      }
    }
  };

  const handleTikTokShare = async () => {
    const text = `${cleanSocialCaption} ${url}`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: cleanSocialCaption,
          url
        });
      } catch (err) {
        // User cancelled sharing
      }
    } else {
      try {
        await navigator.clipboard.writeText(text);
        alert('Caption copied! You can now paste it on TikTok.');
      } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        alert('Caption copied! You can now paste it on TikTok.');
      }
    }
  };

  const handleFacebookShare = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    window.open(facebookUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-green-50 rounded-lg p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">Share this article</h3>
      <div className="text-gray-600 mb-4 whitespace-pre-line">
        {cleanSocialCaption}
      </div>
      <div className="flex gap-3 flex-wrap">
        <button 
          onClick={handleInstagramShare}
          className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Copy for Instagram
        </button>
        <button 
          onClick={handleFacebookShare}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Share on Facebook
        </button>
        <button 
          onClick={handleTikTokShare}
          className="bg-black hover:bg-gray-800 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors"
        >
          Copy for TikTok
        </button>
      </div>
      <p className="text-xs text-gray-500 mt-3">
        For Instagram and TikTok, the caption will be copied to your clipboard. You can then paste it when creating your post.
      </p>
    </div>
  );
};

export default SocialShare;