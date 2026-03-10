import { defineConfig } from "vite";
import { resolve } from "node:path";
import * as glob from "glob";

import HtmlCssPurgePlugin from "vite-plugin-purgecss";

function obtenerHtmlFiles(){
    return Object.fromEntries(
        glob.sync(
            './**/*.html',
            {
                ignore:[
                    './dist/**',
                    './node_modules/**'
                ]
            }
        ).map((file)=>{
            return [
                file.slice(0, file.length - file.split('.').pop().length - 1),
                resolve(__dirname, file)
            ];
        })
    );
}

export default defineConfig({

    
    base: '/PortafolioVite/',

    build:{
        rollupOptions:{
            input: obtenerHtmlFiles()
        },
        minify: true
    },

    css:{
        preprocessorOptions:{
            less:{
                javascriptEnabled: true
            }
        }
    },

    plugins:[
        HtmlCssPurgePlugin()
    ]

});