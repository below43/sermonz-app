# Sermo.nz App
Sermo.nz App is an app for viewing and recording video input from endoscopes and boroscopes.

[Website](https://sermo.nz)

## Source
[GitHub](https://github.com/below43/sermonz-app)

## License
[MIT License](/LICENSE)

## Running the app
Sermo.nz is built on top of [Ionic Framework](https://ionicframework.com/) and [Capacitor](https://capacitorjs.com/).

### Initial setup
Install the Ionic CLI with npm:
`npm install -g @ionic/cli`
`npm install`

Note: If there was a previous installation of the Ionic CLI, it will need to be uninstalled due to a change in package name.
`npm uninstall -g ionic`
`npm install -g @ionic/cli`

### Run the app
```
ionic serve --configuration=development
```

or to run as dev with ssl:
```
ionic serve --configuration=development -b --ssl --external --disableHostCheck
```

or for http:
```
ionic serve --configuration=development -b --external --disableHostCheck
```

or with live reload:
```
ionic capacitor run  --livereload
```

To build for prod:
```
ionic build --service-worker --prod --release
```

### SSL Cert

Generate a self-signed cert 
`ionic ssl generate`

See also: https://ionicframework.com/docs/developing/previewing

### Proxy
To stop CORS errors, add the following environment variable to your dev machine
`export IONIC_HTTP_PROXY="https://localhost:7280"`


### Assets
See: https://github.com/ionic-team/capacitor-assets

```
npx @capacitor/assets generate --pwa
mv icons src/icons
```