'use strict';
const { PerformanceObserver } = require('perf_hooks');

class GCObserver {
    startTime;
    lastTime;
    total;
    current;
    observer;
    start() {
        // if (!this.observer) {
        //    this.lastTime = this.startTime = Date.now();
           // this.total = this.current = 0;
          //  this.observer = new PerformanceObserver((items) => {
                items.getEntries().forEach((item) => {
                    this.current += item.duration;
                    this.total += item.duration;
                });
            });
            this.observer.observe({ entryTypes: ['gc'] });
        }
    }

    stop() {
        if (this.observer) {
            this.observer.disconnect();
            this.observer = null;
        }
    }

    load() {
        if (!this.observer) {
            throw new Error('GCLoad have been closed');
        }
        const now = Date.now();
        const interval = now - this.lastTime;
        const load = this.current / interval * 100;
        this.lastTime = now;
        this.current = 0;
        return {
            lastLoad: load,
            totalLoad: now - this.startTime && this.total / (now - this.startTime) * 100,
        };
    }
}

module.exports = {
    GCObserver
};