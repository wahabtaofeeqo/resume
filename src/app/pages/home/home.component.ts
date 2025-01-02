import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import Typed from 'typed.js';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})

export class HomeComponent implements OnInit {

  submitted = false;
  contactForm: FormGroup;

  @ViewChild("wrapper")
  mainElement: ElementRef;
  email = "Taofeekolamilekan218@gmail.com";

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

    const options = {
      strings: ['Web Developer', 'Mobile App Developer', 'Solution Developer', 'Consultant and Mentor'],
      typeSpeed: 50,
      backSpeed: 50,
      showCursor: true,
      cursorChar: '|',
      loop: true
    }

    const typed = new Typed('.element', options);

    const options1 = {
      strings: ['Hello', "Let's chat!"],
      typeSpeed: 100,
      backSpeed: 0,
      showCursor: true,
      smartBackspace: true,
      cursorChar: '*',
      loop: false,
      onComplete: (self) => {
        this.mainElement.nativeElement.style.display = "block"
        document.getElementById("overlay").style.display = "none";
      },
    }

    const ins = new Typed('.welcome', options1);
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
