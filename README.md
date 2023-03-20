# to install and run

```bash
npm install
```
## start dev environment
```bash
npm start
```
## start prod env 
```bash
npm run prod
```

## compile it into your system
```bash
    npm run make
```

learnmore about packaging at [electronjs.org](https://www.electronjs.org/docs/latest/tutorial/tutorial-packaging)
# Learning Notes

## PreloadScript (preload.js)

Preload Script is pass .js before any of the DOM are rendered.
Preload can acess nodeJS lib
## render (eg index.js)

your typical webbrower js file with that could access npm function provided by preload.js
## main process 
in this case

```bash
./main.js
```
is the file that control the low level interaction with the computer such as read/write file


## icpMain, icpRenderer
both are used to communicate "requests" similar to the relationship between renderer/main and frontend/backend. instead of calling http request it uses icp request(? not sure) as that are generally defined as a simple function


