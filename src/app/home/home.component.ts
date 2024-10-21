import { Component, OnInit, ElementRef, ViewChild, AfterViewInit, HostListener } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})

export class HomeComponent implements OnInit, AfterViewInit {

  submitted = false;
  selectedTab = 'tao';
  contactForm: FormGroup;

  mail = "Taofeekolamilekan218@gmail.com";

  tabs = [
    {
      name: 'Tao',
      icon: '',
      image: '/assets/images/logo.png'
    },
    {
      name: 'About',
      icon: 'fa-solid fa-address-card',
      image: ''
    },
    {
      name: 'Skills',
      icon: 'fa-solid fa-code',
      image: ''
    },
    {
      name: 'Projects',
      icon: 'fa-solid fa-diagram-project',
      image: ''
    },
    {
      name: 'Contact',
      icon: 'fas fa-phone',
      image: ''
    },
    {
      name: 'Tutorials',
      icon: 'fas fa-book',
      image: ''
    }
  ]

  // Hero section
  @ViewChild("hero")
  hero: ElementRef;

  @ViewChild("logo")
  logoEle: ElementRef;

  @ViewChild("heroWrap")
  heroWrap: ElementRef;

  // About Section
  @ViewChild("about")
  about: ElementRef;

  @ViewChild("aboutWrap")
  aboutWrap: ElementRef;

  // Dev section
  @ViewChild("dev")
  dev: ElementRef;

  @ViewChild("devWrap")
  devWrap: ElementRef;
  
  // DevOps
  @ViewChild("devOps")
  devOps: ElementRef;

  @ViewChild("devOpsWrap")
  devOpsWrap: ElementRef;

  text = 'Taofeek';
  textChars = this.text.split(''); // Split the text into an array of characters
  scrollProgress = 0;

  thresholds = [
    0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 
    0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1, 0
  ]

  constructor(
    private http: HttpClient,
    private builder: FormBuilder) {
      this.contactForm = this.builder.group({
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        message: ['', Validators.required]
      })
  }

  ngOnInit() {
    window.addEventListener("scroll", this.onWindowScroll.bind(this));
  }

  @HostListener("window:scroll", ['$event'])
  onWindowScroll(event: any) {

    const scrollPosition = window.scrollY || document.documentElement.scrollTop;

    const rotation = scrollPosition % 360; // Rotate by the scroll position, modulo 360 for a full circle
    const scale = scrollPosition / 1000; // Scale proportionally to the scroll position

    // const scaleValue = Math.min(1 + scrollPosition / 1000, 10); // Caps at 2x scale

    // this.scale.nativeElement.style.opacity = `${scale}`;
    // this.scaleWrap.nativeElement.style.transform = `scale(${scale})`;

    
    // const maxScroll = 300;
    // const scrollTop = window.pageYOffset;
    // this.scrollProgress = Math.min(scrollTop / maxScroll, 1);

    // if(event) {
    //   const scrollPosition = window.scrollY;
    //   const scrollTtitle = this.titleEle.nativeElement
    //   const moveAmount = scrollPosition * 0.5;
    //   scrollTtitle.style.transform = `translateX(${moveAmount}px)`;

    //   let logo = this.logoEle.nativeElement
    //   logo.style.transform = `translateX(${moveAmount}px)`;
    // }
  }

  getOpacity(index: number): number {
    const reverseIndex = this.textChars.length - index - 1; // Reverse the character index
    const fadePoint = reverseIndex / this.textChars.length;
    return Math.max(1 - (this.scrollProgress - fadePoint) * 3, 0); 
  }

  ngAfterViewInit(): void {

    // Hero
    const option = {
      threshold: this.thresholds,
    };
    
    const heroObserver = new IntersectionObserver(this.callback, option);
    heroObserver.observe(this.heroWrap.nativeElement);

    // About
    const aboutObserver = new IntersectionObserver(this.callback, option);
    aboutObserver.observe(this.aboutWrap.nativeElement)

    // Dev
    const devObserver = new IntersectionObserver(this.callback, option);
    devObserver.observe(this.devWrap.nativeElement)

    // DevOps
    const devOpsObserver = new IntersectionObserver(this.callback, option);
    devOpsObserver.observe(this.devOpsWrap.nativeElement)
  }

  callback = (entries, observer) => {
    entries.forEach((entry) => {

      // Element
      let element = this.hero.nativeElement
      switch (entry.target.id) {
        case 'aboutWrap':
          element = this.about.nativeElement
          break;
      
        case 'devWrap':
          element = this.dev.nativeElement
          break;

        case 'devOpsWrap':
          element = this.devOps.nativeElement
          break;
          
        default:
          element = this.hero.nativeElement
          console.log(entry);
          
          if(entry.intersectionRatio >= 0.20) {
            entry.target.classList.add('dev-head')
          }
          else {
            entry.target.classList.remove('dev-head')
          }
          break;
      }
      
      let scale = entry.intersectionRatio;
      const scaleValue = Math.min(1 + scale / 1000, 10); // Caps at 2x scale
      element.style.transform = `scale(${scaleValue})`;
      element.style.opacity = `${scale == 0.50 ? 1 : scale}`;
      
      // if(entry.isIntersecting) {
      //   console.log('Called', entry);
      //   let scale = entry.intersectionRatio;
      //   const scaleValue = Math.min(1 + scale / 1000, 10); // Caps at 2x scale
      //   this.scale.nativeElement.style.transform = `scale(${scaleValue})`;
      //   this.scale.nativeElement.style.opacity = `${scale == 0.50 ? 1 : scale}`;
      // }
      // else {
        
      // }
   
    });
  }
  
  onScroll(event: Event): void {
    // const element = event.target as HTMLElement;
    // let scrollPosition = element.scrollTop;
    // const scrollTtitle = this.titleEle.nativeElement
    // const moveAmount = scrollPosition * 0.5;
    // scrollTtitle.style.transform = `translateX(${moveAmount}px)`;

    // const blowupElement = document.querySelector('.angular-logo') as HTMLElement;
    // scrollPosition = window.scrollY || document.documentElement.scrollTop;

    // const scaleValue = Math.min(1 + scrollPosition / 1000, 2); // Caps at 2x scale
    // blowupElement.style.transform = `scale(${scaleValue})`;
  }

  get f() { return this.contactForm.controls; }

  sendMessage(data) {

    this.submitted = true;
    if (this.contactForm.invalid) 
      return;

    if (this.contactForm.valid) {
      // $("#emailModal").modal('show');
      // const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
      // this.http.post('https://formspree.io/xknvoeny',
      //   { name: data.name, replyto: data.email, message: data.message },
      //   { 'headers': headers }).subscribe(response => {
      //       // console.log(response);
      //       $("#status").html("Email Succesfully sent.")
      //     }
      //   );
    }
  }
}
