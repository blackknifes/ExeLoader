# ExeLoader
exe-loader for webpack

## Installation
Install with npm:
```
npm install --save-dev exe-loader
```

Install with yarn:
```
yarn add -D exe-loader
```

## Usage
```
{
    test: /\.exe$/,
    loader: "exe-loader",
    options: {
        path: path.resolve(__dirname, "native"),
        relative: "../native"
    }
}
```

## Options
### path
Type: string Default: undefined
Specifies copy directory of exe file.

### relative
Type: string Default: undefined
Specifies replacement of exe file path.