
// Bredd och höjd på pixlarna. Dina pixlar verkar
// inte vara en matris utan staplar, så nog lättast om du sätter höjden till 1
// och bredden till antalet pixlar och räknar ut var nästa stapel börjar.
// Min lampa har bara 24 pixlar.
const STRIP_WIDTH = 24;
const STRIP_HEIGHT = 1;

// Antalet leds
const STRIP_LEDS = STRIP_WIDTH * STRIP_HEIGHT;

// Beroende hur du kopplat upp din Pi...
const STRIP_DMA = 10;
const STRIP_GPIO = 18;

// Beroende på vilket fabrikat, kan det skilja sig åt, 'bgr' etc...
const STRIP_TYPE = 'rgb';

// Ladda upp mjukvaran...
const {createCanvas} = require('canvas');
const canvas = createCanvas(STRIP_WIDTH, STRIP_HEIGHT);
const ctx = canvas.getContext('2d')
const ws281x = require('rpi-ws281x');

// Gör vad du vill med "ctx", jag fyller bara med lila...
ctx.fillStyle = "purple";
ctx.fillRect(0, 0, STRIP_WIDTH, STRIP_HEIGHT);

// Hämta pixlarna
var buffer = canvas.toBuffer('raw');

// Konvertera pixlarna till en vektor med uint32
var pixels = new Uint32Array(STRIP_LEDS);

for (var i = 0; i < STRIP_LEDS; i++) {
    pixels[i] = buffer.readUInt32LE(i * 4);
}

// Konfigurera dina leds (https://www.npmjs.com/package/rpi-ws281x)
// Det finns ett antal olika inställningar som dma/gpio etc...
ws281x.configure({leds:STRIP_LEDS, strip:STRIP_TYPE, dma:STRIP_DMA, gpio:STRIP_GPIO});

// Rendrera!!
ws281x.render(pixels);

// Måste erkänna att modulen 'rpi-ws281x' borde kunna konvertera från en Buffer 
// till en Uint32Array per automatik... 
