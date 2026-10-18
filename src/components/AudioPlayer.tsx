import React, { useEffect, useRef, useCallback } from 'react';

interface AudioPlayerProps {
  youtubeVideoId?: string;
  unmuteTrigger?: boolean;
}

declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  youtubeVideoId = 'Qo175VaAl78',
  unmuteTrigger = false,
}) => {
  const playerRef = useRef<any>(null);
  const isInitializingRef = useRef(false);
  const containerId = 'yt-wedding-audio-player-jasmina-fayis';

  // Helper to attempt unmuted playback
  const attemptUnmutedPlay = useCallback((player: any) => {
    try {
      if (!player) return;
      if (typeof player.unMute === 'function') player.unMute();
      if (typeof player.setVolume === 'function') player.setVolume(100);
      if (typeof player.playVideo === 'function') player.playVideo();
    } catch (err) {
      console.warn('Unmuted play attempt notice:', err);
    }
  }, []);

  // Helper to attempt muted playback if unmuted autoplay is blocked by browser policy
  const attemptMutedPlay = useCallback((player: any) => {
    try {
      if (!player) return;
      if (typeof player.mute === 'function') player.mute();
      if (typeof player.playVideo === 'function') player.playVideo();
    } catch (err) {
      console.warn('Muted play attempt notice:', err);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    const createPlayer = () => {
      if (playerRef.current || isInitializingRef.current) return;
      const container = document.getElementById(containerId);
      if (!container || !window.YT || !window.YT.Player) return;

      isInitializingRef.current = true;

      try {
        playerRef.current = new window.YT.Player(containerId, {
          height: '180',
          width: '180',
          videoId: youtubeVideoId,
          playerVars: {
            autoplay: 1, // Enable automatic playback
            controls: 0,
            disablekb: 1,
            enablejsapi: 1,
            fs: 0,
            loop: 1, // Enable continuous looping
            playlist: youtubeVideoId, // Required by YouTube IFrame API for looping a single video
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
            iv_load_policy: 3,
            origin: window.location.origin,
          },
          events: {
            onReady: (event: any) => {
              if (!isMounted) return;
              isInitializingRef.current = false;

              // 1. First attempt: Autoplay with sound
              try {
                event.target.unMute();
                event.target.setVolume(100);
                const playPromise = event.target.playVideo();
                if (playPromise && typeof playPromise.catch === 'function') {
                  playPromise.catch(() => {
                    // Browser blocked unmuted autoplay -> fall back to muted autoplay
                    attemptMutedPlay(event.target);
                  });
                }
              } catch {
                attemptMutedPlay(event.target);
              }
            },
            onStateChange: (event: any) => {
              if (!isMounted) return;
              const state = event.data;
              const YTState = window.YT?.PlayerState;

              // ENDED (state === 0) -> CONTINUOUS LOOP GUARANTEE
              if (state === 0 || (YTState && state === YTState.ENDED)) {
                try {
                  event.target.seekTo(0, true);
                  event.target.playVideo();
                } catch {
                  // Fallback loop trigger
                  try {
                    event.target.playVideo();
                  } catch {}
                }
              }
            },
            onError: (err: any) => {
              if (!isMounted) return;
              console.warn('YouTube audio player notification:', err);
              isInitializingRef.current = false;
            },
          },
        });
      } catch (err) {
        console.warn('Error instantiating YouTube player:', err);
        isInitializingRef.current = false;
      }
    };

    if (window.YT && window.YT.Player) {
      createPlayer();
    } else {
      if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
        const tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        const first = document.getElementsByTagName('script')[0];
        first?.parentNode?.insertBefore(tag, first);
      }
      const prevCallback = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        if (typeof prevCallback === 'function') prevCallback();
        if (isMounted) createPlayer();
      };
    }

    // Global listener for first user interaction (tap/click/scroll) to lift browser autoplay audio mute
    const handleFirstUserInteraction = () => {
      if (playerRef.current) {
        try {
          if (playerRef.current.isMuted()) {
            playerRef.current.unMute();
            playerRef.current.setVolume(100);
          }
          if (typeof playerRef.current.getPlayerState === 'function' && playerRef.current.getPlayerState() !== 1) {
            playerRef.current.playVideo();
          }
        } catch {}
      }
    };

    window.addEventListener('click', handleFirstUserInteraction, { once: true, passive: true });
    window.addEventListener('touchstart', handleFirstUserInteraction, { once: true, passive: true });

    return () => {
      isMounted = false;
      window.removeEventListener('click', handleFirstUserInteraction);
      window.removeEventListener('touchstart', handleFirstUserInteraction);
      if (playerRef.current && typeof playerRef.current.destroy === 'function') {
        try {
          playerRef.current.destroy();
          playerRef.current = null;
        } catch {}
      }
      isInitializingRef.current = false;
    };
  }, [youtubeVideoId, attemptMutedPlay]);

  // Handle external unmute trigger (e.g. when visitor taps to open envelope)
  useEffect(() => {
    if (unmuteTrigger && playerRef.current) {
      attemptUnmutedPlay(playerRef.current);
    }
  }, [unmuteTrigger, attemptUnmutedPlay]);

  return (
    <div
      style={{
        position: 'fixed',
        top: '-9999px',
        left: '-9999px',
        width: '1px',
        height: '1px',
        opacity: 0,
        pointerEvents: 'none',
        zIndex: -100,
        overflow: 'hidden',
      }}
      aria-hidden="true"
    >
      <div id={containerId} />
    </div>
  );
};
