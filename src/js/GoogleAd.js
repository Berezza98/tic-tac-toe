import EventEmitter from "./EventEmitter";

export default class GoogleAd extends EventEmitter {
  constructor(containerEl, videoContentEl) {
    super();
    this.containerEl = containerEl;
    this.videoContentEl = videoContentEl;
    this.adDisplayContainer = new google.ima.AdDisplayContainer(
      this.containerEl,
      this.videoContentEl
    );
    this.adsLoader = new google.ima.AdsLoader(this.adDisplayContainer);
    this.addEventHandlers();
    this.videoContentEl.onended = this.contentEndedListener;
    this.adRequestInit();
  }

  adRequestInit() {
    this.adsRequest = new google.ima.AdsRequest();
    this.adsRequest.adTagUrl = 'https://pubads.g.doubleclick.net/gampad/ads?' +
      'sz=640x480&iu=/124319096/external/single_ad_samples&ciu_szs=300x250&' +
      'impl=s&gdfp_req=1&env=vp&output=vast&unviewed_position_start=1&' +
      'cust_params=deployment%3Ddevsite%26sample_ct%3Dlinear&correlator=';

    this.adsRequest.linearAdSlotWidth = 1280;
    this.adsRequest.linearAdSlotHeight = 720;
  
    this.adsRequest.nonLinearAdSlotWidth = 1280;
    this.adsRequest.nonLinearAdSlotHeight = 150;
  
    this.adsLoader.requestAds(this.adsRequest);
  }

  contentEndedListener() {
    this.adsLoader.contentComplete();
  }

  addEventHandlers() {
    this.adsLoader.addEventListener(
      google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
      (AdsManagerLoadedEvent) => {
        console.log("ads manager loaded");
        this.onAdsManagerLoaded(AdsManagerLoadedEvent);
      },
      false);
    this.adsLoader.addEventListener(
      google.ima.AdErrorEvent.Type.AD_ERROR,
      (adErrorEvent) => {
        this.onAdError(adErrorEvent);
      },
      false);
  }

  onAdError(adErrorEvent) {
    // Handle the error logging and destroy the AdsManager
    console.log(adErrorEvent.getError());
    this.adsManager.destroy();
  }
  
  onAdsManagerLoaded(adsManagerLoadedEvent) {
    // Get the ads manager.
    console.log(this)
    this.adsRenderingSettings = new google.ima.AdsRenderingSettings();
    this.adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = true;
    // videoContent should be set to the content video element.
    this.adsManager = adsManagerLoadedEvent.getAdsManager(
      this.videoContentEl, this.adsRenderingSettings);
  
    // Add listeners to the required events.
    this.adsManager.addEventListener(
      google.ima.AdErrorEvent.Type.AD_ERROR,
      this.onAdError);
    this.adsManager.addEventListener(
      google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,
      (e) => {
        this.onContentPauseRequested(e);
      })
    this.adsManager.addEventListener(
      google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,
      (e) => {
        this.onContentResumeRequested(e);
      })
    this.adsManager.addEventListener(
      google.ima.AdEvent.Type.ALL_ADS_COMPLETED,
      (e) => {
        this.onAdEvent(e);
      })
  
    // Listen to any additional events, if necessary.
    this.adsManager.addEventListener(
      google.ima.AdEvent.Type.LOADED,
      (adEvent) => {
        console.log("ad loaded");
        this.onAdEvent(adEvent);
      });
    this.adsManager.addEventListener(
      google.ima.AdEvent.Type.STARTED,
      (adEvent) => {
        this.onAdEvent(adEvent);
      });
    this.adsManager.addEventListener(
      google.ima.AdEvent.Type.COMPLETE,
      (adEvent) => {
        this.emit("adFinished");
        this.onAdEvent(adEvent);
      });
  }

  onAdEvent(adEvent) {
    console.log(this);
    // Retrieve the ad from the event. Some events (e.g. ALL_ADS_COMPLETED)
    // don't have ad object associated.
    var ad = adEvent.getAd();
    switch (adEvent.type) {
      case google.ima.AdEvent.Type.LOADED:
        // This is the first event sent for an ad - it is possible to
        // determine whether the ad is a video ad or an overlay.
        if (!ad.isLinear()) {
          // Position AdDisplayContainer correctly for overlay.
          // Use ad.width and ad.height.
          this.videoContentEl.play();
        }
        break;
      case google.ima.AdEvent.Type.STARTED:
        // This event indicates the ad has started - the video player
        // can adjust the UI, for example display a pause button and
        // remaining time.
        if (ad.isLinear()) {
          // For a linear ad, a timer can be started to poll for
          // the remaining time.
          this.intervalTimer = setInterval(
              () => {
                var remainingTime = this.adsManager.getRemainingTime();
              },
              300); // every 300ms
        }
        break;
      case google.ima.AdEvent.Type.COMPLETE:
        console.log("finished");
        // This event indicates the ad has finished - the video player
        // can perform appropriate UI actions, such as removing the timer for
        // remaining time detection.
        if (ad.isLinear()) {
          clearInterval(this.intervalTimer);
        }
        break;
    }
  }
  
  onContentPauseRequested() {
    this.videoContentEl.pause();
    // This function is where you should setup UI for showing ads (e.g.
    // display ad timer countdown, disable seeking etc.)
    // setupUIForAds();
  }
  
  onContentResumeRequested() {
    this.videoContentEl.play();
    // This function is where you should ensure that your UI is ready
    // to play content. It is the responsibility of the Publisher to
    // implement this function when necessary.
    // setupUIForContent();
  
  }

  playAds() {
    console.log(this);
    // Initialize the container. Must be done via a user action on mobile devices.
    this.videoContentEl.load();
    this.adDisplayContainer.initialize();
  
    try {
      console.log(this);
      // Initialize the ads manager. Ad rules playlist will start at this time.
      this.adsManager.init(1280, 720, google.ima.ViewMode.NORMAL);
      console.log("ad manager inited");
      // Call play to start showing the ad. Single video and overlay ads will
      // start at this time; the call will be ignored for ad rules.
      this.adsManager.start();
      console.log("ad manager started");
    } catch (adError) {
      console.log(adError);
      // An error may be thrown if there was a problem with the VAST response.
      this.videoContentEl.play();
    }
  }
}