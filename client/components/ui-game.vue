<template>
    <div>
        <div class="row g-0">
            <div class="col-6">
                <div ref="game" style="width:100%; height:600px;"></div>
                <ui-pre :value="$data"></ui-pre>
            </div>

            <div class="col-6">
                <l-map v-bind.sync="map" ref="map" style="width:100%; height:300px;">
                    <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"></l-tile-layer>
                </l-map>

                <div class="row g-0" v-if="tiles">
                    <div class="col-6" v-for="(t, tname) in tiles">
                        <img :src="t.url" alt="" width="100%" height="300px" style="object-fit:cover;" :key="t.url">
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

import { LMap, LTileLayer, LMarker, LPolyline, LPolygon } from 'vue2-leaflet';
import 'leaflet/dist/leaflet.css';

export default {
    components: { LMap, LTileLayer, LMarker, LPolyline, LPolygon },

    watch: {
        map: {deep:true, handler(value) {
            localStorage.setItem('ui-game-map', JSON.stringify(value));
            this.terrainGenerate();
        }},
    },

    data() {
        return {
            width: 800,
            height: 600,

            map: {
                zoom: 17,
                center: {lat:0, lng:0},
                ...JSON.parse(localStorage.getItem('ui-game-map') || '{}')
            },

            scene: Object.assign(new THREE.Scene(), {
                background: new THREE.Color(0xeeffff),
            }),

            camera: new THREE.PerspectiveCamera(40, this.width/this.height, 1, 100),
            
            renderer: Object.assign(new THREE.WebGLRenderer( { antialias: true } ), {
                outputEncoding: THREE.sRGBEncoding,
            }),

            char: false,
            
            tiles: false,
            terrain: false,
        };
    },

    methods: {
        geolocation() {
            return new Promise((resolve, reject) => {
                navigator.geolocation.getCurrentPosition(position => {
                    resolve({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                });
            });
        },

        terrainGenerate() {
            let _getPixels = (url) => {
                return new Promise((resolve, reject) => {
                    return;
                    let img = Object.assign(document.createElement('img'), {
                        src: url,
                        crossOrigin: 'Anonymous',
                        onload: ev => {
                            const canvas = document.createElement('canvas');
                            let context = canvas.getContext('2d');

                            let img = ev.target;
                            canvas.width = img.width;
                            canvas.height = img.height;
                            context.drawImage(img, 0, 0, img.width, img.height);
                            let pixels = context.getImageData(0, 0, img.width, img.height).data;

                            let points = [];
                            for (let i = 0; i < pixels.length; i += 4) {
                                let r=pixels[i+0], g=pixels[i+1], b=pixels[i+2];
                                let height = (-10000 + ((r * 256 * 256 + g * 256 + b) * 0.1)) / 1000;
                                let x=pixels[i+0], y=height, z=pixels[i+2];
                                points.push(x, y, z);
                            }

                            // console.log(new Float32Array(points));

                            resolve({
                                width: img.width,
                                height: img.height,
                                pixels,
                                points,
                            });
                        },
                    });
                });
            };

            this.tiles = {
                terrain: this.coordsChunk(18, this.map.center, 'https://api.mapbox.com/v4/mapbox.terrain-rgb/{z}/{x}/{y}.pngraw?access_token=pk.eyJ1IjoiZnJlZWpzb24iLCJhIjoiY2t3ZGo4eWk5aDI1ODJvcGdkZHM4N2l6MyJ9.Fmr5JEBFWEmv4h1JWFVW3Q'),
                satellite: this.coordsChunk(18, this.map.center, '	https://cartodb-basemaps-{s}.global.ssl.fastly.net/dark_all/{z}/{x}/{y}.png'),
            };

            _getPixels(this.tiles.terrain.url).then(({width, height, pixels}) => {
                let planeSize = Math.sqrt(pixels.length / 4);
                // let geometry = new THREE.PlaneGeometry(planeSize, planeSize, planeSize - 1, planeSize - 1);
                let geometry = new THREE.PlaneGeometry(width/25, height/25, planeSize-1, planeSize-1);
                geometry.verticesNeedUpdate = true;

                // let vertices = geometry.attributes.position.array;
                // for (let i=0, j=0, l=vertices.length; j<l; i++, j+=3 ) {
                //     vertices[j+2] = i%100==0? 1: 0;
                //     // console.log(`0=${vertices[j+0]}, 1=${vertices[j+1]}, 2=${vertices[j+2]}, 3=${vertices[j+3]}`);
                //     // vertices[ j + 1 ] = heights[i];
                // }

                // for (let i = 0; i < pixels.length; i += 4) {
                //     let r = pixels[i + 0];
                //     let g = pixels[i + 1];
                //     let b = pixels[i + 2];
                //     let height = (-10000 + ((r * 256 * 256 + g * 256 + b) * 0.1)) / 1000;
                //     // geometry.attributes.position.array[i/4] = height;
                //     // geometry.attributes.position.array[i+3] = height;
                //     geometry.attributes.position.array[i+4] = height;
                // }
                
                // let texture = new THREE.TextureLoader().load(this.tiles.satellite.url);
                let texture = new THREE.TextureLoader().load(this.tiles.terrain.url);
                let material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide, wireframe: true });
                
                if (this.terrain) { this.scene.remove(this.terrain); }
                this.scene.add(this.terrain = new THREE.Mesh(geometry, material));
                this.terrain.rotation.x = -Math.PI / 2;
            });

            // let bumpTexture = new THREE.ImageUtils.loadTexture(this.tiles.terrain.url);
            let bumpTexture = new THREE.TextureLoader().load(this.tiles.terrain.url);
            bumpTexture.wrapS = bumpTexture.wrapT = THREE.RepeatWrapping;
            
            let customUniforms = {
                bumpTexture: { type: "f", value: bumpTexture },
            };

            let vertexShader = `uniform sampler2D bumpTexture;
            uniform float bumpScale;

            varying float vAmount;
            varying vec2 vUV;

            void main() 
            { 
                vUV = uv;
                vec4 bumpData = texture2D( bumpTexture, uv );
                
                vAmount = bumpData.r; // assuming map is grayscale it doesn't matter if you use r, g, or b.
                
                // move the position along the normal
                vec3 newPosition = position + normal * bumpScale * vAmount;
                
                gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
            }`;

            let fragmentShader = `uniform sampler2D oceanTexture;
            uniform sampler2D sandyTexture;
            uniform sampler2D grassTexture;
            uniform sampler2D rockyTexture;
            uniform sampler2D snowyTexture;

            varying vec2 vUV;

            varying float vAmount;

            void main() 
            {
                vec4 water = (smoothstep(0.01, 0.25, vAmount) - smoothstep(0.24, 0.26, vAmount)) * texture2D( oceanTexture, vUV * 10.0 );
                vec4 sandy = (smoothstep(0.24, 0.27, vAmount) - smoothstep(0.28, 0.31, vAmount)) * texture2D( sandyTexture, vUV * 10.0 );
                vec4 grass = (smoothstep(0.28, 0.32, vAmount) - smoothstep(0.35, 0.40, vAmount)) * texture2D( grassTexture, vUV * 20.0 );
                vec4 rocky = (smoothstep(0.30, 0.50, vAmount) - smoothstep(0.40, 0.70, vAmount)) * texture2D( rockyTexture, vUV * 20.0 );
                vec4 snowy = (smoothstep(0.50, 0.65, vAmount))                                   * texture2D( snowyTexture, vUV * 10.0 );
                gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0) + water + sandy + grass + rocky + snowy; //, 1.0);
            }`;

            let customMaterial = new THREE.ShaderMaterial({
                uniforms: customUniforms,
                vertexShader: vertexShader,
                fragmentShader: fragmentShader,
                side: THREE.DoubleSide,
            });

            var geometry = new THREE.PlaneGeometry( 1000, 1000, 100, 100 );
            if (this.terrain) { this.scene.remove(this.terrain); }
            this.scene.add(this.terrain = new THREE.Mesh(geometry, customMaterial));
            this.terrain.rotation.x = -Math.PI / 2;
        },

        coordsChunk(zoom, coords, url) {
            let deg2rad = (degrees) => { return degrees * (Math.PI/180); };
            
            let ret = {url};
            ret.x = Math.floor(((coords.lng + 180) / 360) * Math.pow(2, zoom));
		    ret.y = Math.floor((1 - Math.log(Math.tan(deg2rad(coords.lat)) + 1 / Math.cos(deg2rad(coords.lat))) / Math.PI) /2 * Math.pow(2, zoom));
            ret.z = zoom;
            ret.s = 'a';

            ['x', 'y', 'z', 's'].forEach(l => {
                [`{${l}}`, `\${${l}}`].forEach(find => {
                    ret.url = ret.url.replace(find, ret[l], ret.url);
                });
            });

            return ret;
        },

        threeInit() {
            this.scene.add(this.scene.camera);
            this.$refs.game.appendChild(this.renderer.domElement);
            this.threeResize();
            this.threeCreate();
            this.threeRender();
        },

        threeRender() {
            if (window._uiGameRenderInterval) clearInterval(window._uiGameRenderInterval);
            window._uiGameRenderInterval = setInterval(() => {
                this.threeUpdate();
                this.renderer.render(this.scene, this.camera);
            }, 1000/60);
        },

        threeResize() {
            this.width = this.$refs.game.offsetWidth;
            this.height = this.$refs.game.offsetHeight;
            this.camera.aspect = this.width/this.height;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(this.width, this.height);
        },

        threeCreate() {
            console.log('threeCreate');
            this.camera.position.x = 5;
            this.camera.position.y = 5;
            this.camera.position.z = 5;

            new OrbitControls(this.camera, this.renderer.domElement);
            this.scene.add(new THREE.GridHelper(10, 10));

            this.terrainGenerate();
        },

        threeUpdate() {
            // console.log('threeUpdate');
        },
    },

    mounted() {
        if (this.map.center.lat==0 && this.map.center.lng==0) {
            this.geolocation().then(coords => {
                this.map.center = coords;
            });
        }

        this.threeInit();
    },

    beforeDestroy() {
        clearInterval(window._uiGameRenderInterval);
    },
}
</script>