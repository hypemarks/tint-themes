declare global {
  interface Window {
    analytics: {
      track: (msg: string, body?: { [key: string]: string }) => void;
    };
  }
}

export class Tracker {
  private isTrackingEnable: boolean;
  private tintSlug: string;
  private tintId: string;

  constructor(isTrackingEnable: boolean, tintSlug: string, tintId: string) {
    this.isTrackingEnable = isTrackingEnable;
    this.tintSlug = tintSlug;
    this.tintId = tintId;
  }

  public event(message: string, body?: { [key: string]: string }): void {
    if (this.isTrackingEnable) {
      window.analytics.track(message, {
        tint: this.tintSlug,
        tint_id: this.tintId,
        ...body,
      });
    }
  }
}
