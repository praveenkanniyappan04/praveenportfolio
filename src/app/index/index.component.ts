import { AfterViewInit, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiServiceService } from '../services/api-service.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent implements AfterViewInit, OnInit {
    contactData: FormGroup;
  submitted = false;
  isSubmitting = false;
  successMsg = '';
  errorMsg = '';
  constructor(@Inject(PLATFORM_ID) private platformId: object,
private fb:FormBuilder, private auth:ApiServiceService) {
      this.contactData = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[A-Za-z ]+$/)]],
      emailid: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/)]],
      message: ['', [Validators.required, Validators.minLength(2), Validators.pattern(/^[A-Za-z ]+$/)]],
      Subject: ['', Validators.required,  Validators.minLength(2)]
    });
}
// 
ngOnInit(): void {

}
onSubmit(){
    this.submitted = true;
    this.errorMsg = '';
    this.successMsg = '';
     if (this.contactData.invalid) {
      return;
    }
        this.isSubmitting = true;

    this.auth.formData(this.contactData.value).subscribe({
      next: (res: any) => {
        this.successMsg = 'Submitted successfully';
        // this.successMsg = res.message || 'Submitted successfully';
        this.isSubmitting = false;
this.contactData.reset();
        // setTimeout(() => {
        //   this.router.navigate(['/']);
        // }, 3000);
      },

      error: (err: any) => {
        this.errorMsg = 'Submission failed';
        // this.errorMsg = err?.error?.message || 'Submission failed';
        this.isSubmitting = false;
      }
    });
}
// 
  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    // Wait until Angular has painted the template before initializing jQuery plugins.
    setTimeout(() => this.initializeTemplatePlugins(), 0);
  }

  private initializeTemplatePlugins(): void {
    const w = window as any;
    const $ = w.jQuery || w.$;
    if (!$) {
      console.warn('jQuery was not loaded. Check the scripts array in angular.json.');
      return;
    }

    if (w.WOW) new w.WOW().init();

    if (w.Typed && $('.typed-text-output').length && $('.typed-text').length) {
      const typedStrings = $('.typed-text').text();
      new w.Typed('.typed-text-output', {
        strings: typedStrings.split(', '),
        typeSpeed: 100,
        backSpeed: 20,
        smartBackspace: false,
        loop: true
      });
    }

    if ($.fn.waypoint) {
      $('.skill').waypoint(() => {
        $('.progress .progress-bar').each(function(this: HTMLElement) {
          const value = this.getAttribute('aria-valuenow') || '0';
          (this as HTMLElement).style.width = value + '%';
        });
      }, { offset: '80%' });
    }

    if ($.fn.counterUp) {
      $('[data-toggle="counter-up"]').counterUp({ delay: 10, time: 2000 });
    }

    if ($.fn.isotope && $('.portfolio-container').length) {
      const portfolio = $('.portfolio-container').isotope({
        itemSelector: '.portfolio-item',
        layoutMode: 'fitRows'
      });
      $('#portfolio-flters li').on('click', function(this: HTMLElement) {
        $('#portfolio-flters li').removeClass('active');
        $(this).addClass('active');
        portfolio.isotope({ filter: $(this).data('filter') });
      });
    }

    if ($.fn.owlCarousel && $('.testimonial-carousel').length) {
      $('.testimonial-carousel').owlCarousel({
        autoplay: true, smartSpeed: 1000, items: 1, dots: true, loop: true
      });
    }

    // Template navbar, smooth-scroll and back-to-top behavior.
    $(window).on('scroll', () => {
      if ($(window).scrollTop() > 300) {
        $('.navbar').stop(true, true).fadeIn('slow').css('display', 'flex');
        $('.back-to-top').stop(true, true).fadeIn('slow');
      } else {
        $('.navbar').stop(true, true).fadeOut('slow');
        $('.back-to-top').stop(true, true).fadeOut('slow');
      }
    });

    $('.navbar-nav a[href^="#"]').on('click', function(this: HTMLAnchorElement, event: Event) {
      const target = this.hash;
      if (!target || !$(target).length) return;
      event.preventDefault();
      $('html, body').animate({ scrollTop: $(target).offset().top - 45 }, 700);
      $('.navbar-nav .active').removeClass('active');
      $(this).addClass('active');
    });

    $('.back-to-top').on('click', (event: Event) => {
      event.preventDefault();
      $('html, body').animate({ scrollTop: 0 }, 700);
    });

    // Hide the loading overlay after the page is ready.
    $('#spinner').removeClass('show');
  }
  // 
    sanitizeText(event: Event, field: string) {
    const input = event.target as HTMLInputElement;

    // Allow letters and spaces only
    let value = input.value.replace(/[^a-zA-Z ]/g, '');

    input.value = value;

    this.contactData.controls[field].setValue(value, {
      emitEvent: false
    });
  }
// 
  get f() {
    return this.contactData.controls;
  }



}
