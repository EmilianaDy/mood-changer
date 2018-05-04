import React, { Component} from 'react';
import AnimationClouds from './AnimationClouds';
import snowman from '../images/snowman.svg';

export default class AnimationSnow extends Component {
    constructor(props) {
        super(props);
        this.snowCanvasRef = React.createRef();
        this.setFlakesData = this.setFlakesData.bind(this);
        this.moveFlakes = this.moveFlakes.bind(this);
        this.snowFlakes = [];  
        this.maxSnowFlakes = 150;    
        this.canvasWidth = window.innerWidth;
        this.canvasHeight = window.innerHeight - 100;
    }

    componentDidMount() {
        this.setFlakesData();
        this.animFrame = requestAnimationFrame(this.moveFlakes);
    }


    moveFlakes = () => {
        if (this.snowCanvasRef.current != null) {
            var ctx = this.snowCanvasRef.current.getContext('2d');
            ctx.fillStyle = 'rgb(255, 255, 255)';
            ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

            for (let i = 0; i < this.maxSnowFlakes; i++) {
                
                if (this.snowFlakes[i]) {
                    var flake = this.snowFlakes[i];
                    ctx.beginPath();
                    ctx.moveTo(flake.x, flake.y);
                    ctx.arc(flake.x, flake.y, flake.r, 0, Math.PI * 2, true); 
                    ctx.fill();

                    if (flake.r >= 4) {
                        flake.y += 3
                    } else {
                        flake.y += flake.r
                    }

                    if (flake.y >= this.canvasHeight) {
                        flake.y = 0;
                    }
                }       
            } 

            requestAnimationFrame(this.moveFlakes);
        }   
    }

    setFlakesData = () => {  
        for (let i = 0; i < this.maxSnowFlakes; i++) {
            this.snowFlakes.push({
                x: Math.random() * this.canvasWidth,
                y: Math.random() * this.canvasHeight,
                r: Math.random() * 5 + 1
            })
        }
    }

    render() {
        return (
            <div className="snow__wrapper">
                <AnimationClouds cloudDensity="high"/>
                <canvas className="snowCanvas" ref={this.snowCanvasRef} width={this.canvasWidth} height={this.canvasHeight}></canvas>
                <img alt="snowman" src={snowman}/>
            </div>
        );
    }
}