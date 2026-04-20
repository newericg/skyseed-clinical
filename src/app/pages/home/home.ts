import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent implements AfterViewInit {
  ngAfterViewInit() {
    // Scroll reveal
    const fadeEls = document.querySelectorAll('.fade-up');
    if (typeof IntersectionObserver !== 'undefined') {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
      }, { threshold: 0.1 });
      fadeEls.forEach(el => observer.observe(el));
    }

    // Tabs logic
    const tabs = document.querySelectorAll('.tab-item');
    const bars = [
      document.getElementById('b1'), 
      document.getElementById('b2'), 
      document.getElementById('b3')
    ];
    const barVals = [
      document.getElementById('b1v'), 
      document.getElementById('b2v'), 
      document.getElementById('b3v')
    ];

    const updateBars = (values: number[]) => {
      bars.forEach((bar, i) => {
        if (!bar) return;
        bar.style.width = '0';
        bar.style.transition = 'none';
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            bar.style.transition = 'width 1.2s cubic-bezier(.4,0,.2,1)';
            bar.style.width = values[i] + '%';
            if (barVals[i]) {
              barVals[i]!.textContent = values[i] + '%';
            }
          });
        });
      });
    };

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        const dataBars = (tab as HTMLElement).dataset['bars'];
        if (dataBars) {
          const vals = JSON.parse(dataBars);
          updateBars(vals);
        }
      });
    });

    // Testimonial scroll
    const scroll = document.getElementById('testiScroll');
    const scrollLeftBtn = document.getElementById('scrollLeft');
    const scrollRightBtn = document.getElementById('scrollRight');

    if (scrollLeftBtn && scroll) {
      scrollLeftBtn.addEventListener('click', () => {
        scroll.scrollBy({ left: -344, behavior: 'smooth' });
      });
    }
    if (scrollRightBtn && scroll) {
      scrollRightBtn.addEventListener('click', () => {
        scroll.scrollBy({ left: 344, behavior: 'smooth' });
      });
    }

    // Animate bars on load
    setTimeout(() => updateBars([85, 72, 68]), 800);
  }
}
