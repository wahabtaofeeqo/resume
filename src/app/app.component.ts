import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, AfterViewInit {

  title = 'resume';
  selectedTab = 'tao';

  @ViewChild('canvas') canvasRef!: ElementRef<HTMLCanvasElement>;

  private lines: any[] = [];
  private ctx!: CanvasRenderingContext2D;
  private windowHeight = window.innerHeight;

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

  constructor() { }

 ngOnInit(): void {
   
  }

  ngAfterViewInit(): void {
    // this.initCanvas();
    // this.generateLines();
    // this.drawLines(); // Initial draw

    // this.drawLogoAndText();
  }

  // Initialize the canvas context
  initCanvas() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx = canvas.getContext('2d')!;
    canvas.width = window.innerWidth;
    canvas.height = 500; // Adjust based on section height
  }

  // Generate lines with random positions
  generateLines() {
    const totalLines = 20; // Adjust number of lines as needed
    for (let i = 0; i < totalLines; i++) {
      this.lines.push({
        x: Math.random() * window.innerWidth,  // Random X position
        y: Math.random() * 500,                // Random Y position within the section height
        length: 100 + Math.random() * 50,      // Random line length
        color: `rgba(255, 0, 100, ${Math.random() * 0.8})`, // Random color and opacity
      });
    }
  }

  // Draw the lines on the canvas with gradient
  drawLines() {
    const canvas = this.canvasRef.nativeElement;
    this.ctx.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas before each draw

    this.lines.forEach(line => {
      this.ctx.beginPath();

      // Create a linear gradient for each line
      const gradient = this.ctx.createLinearGradient(line.x, line.y, line.x + line.length, line.y + line.length);
      
      // Define the gradient colors (from start to end of line)
      gradient.addColorStop(0, 'rgba(255, 0, 100, 1)');  // Start color (red)
      gradient.addColorStop(1, 'rgba(0, 100, 255, 1)');  // End color (blue)
      
      this.ctx.strokeStyle = gradient;
      this.ctx.lineWidth = 2; // Adjust thickness of the line
      this.ctx.moveTo(line.x, line.y);
      this.ctx.lineTo(line.x + line.length, line.y + line.length); // Draw the diagonal line
      this.ctx.stroke();
    });
  }

  // Handle scroll event
  @HostListener('window:scroll', [])
  onScroll(): void {
    this.animateLines();
  }

  // Animate lines on scroll
  animateLines() {
    const scrollY = window.scrollY;
    // Animate the Y position of each line based on scroll
    this.lines.forEach(line => {
      line.y = (line.y + scrollY * 0.1) % 500; // Adjust movement speed
    });
    
    // Redraw the lines
    // this.drawLines();
  }

  drawLogoAndText() {
    const canvas = this.canvasRef.nativeElement;

    // Clear the canvas before drawing
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw a simple logo (you can replace this with an image later)
    this.drawLogo(50, 50, 50);

    // Draw the gradient text "Taofeek"
    this.drawGradientText('Taofeek', 150, 120);
  }

    // Function to draw a placeholder logo (random shape for now)
    drawLogo(x: number, y: number, size: number) {
      const logoImage = new Image();
      logoImage.src = '/assets/images/avatar-laptop.png'; // Add the actual logo path
      logoImage.onload = () => {
          this.ctx.drawImage(logoImage, 50, 30, 100, 100); // Adjust position and size
      };
    }
  
    // Function to draw gradient text
    drawGradientText(text: string, x: number, y: number) {
      // Create a gradient for the text
      const gradient = this.ctx.createLinearGradient(x, y - 50, x + 200, y);
      gradient.addColorStop(0, '#FF416C'); // Start color
      gradient.addColorStop(1, '#FFC300'); // End color
  
      // Set font properties
      this.ctx.font = 'bold 100px Arial';  // Font size and family
      this.ctx.fillStyle = gradient;  // Apply gradient as fill style
  
      // Draw the text on the canvas
      this.ctx.fillText(text, x, y);
    }
}
