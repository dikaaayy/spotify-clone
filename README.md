# Spotify Web 'Player'

<img src="images/spotifyMacbook.png" width="1000"/>

This project was made with NextJS, recoil for the state management, and TailwindCSS for styling. This portfolio project still on progress to create spotify's comprehensive feature. There will be few bugs/error here and there but i'm trying to fix it!

## Preview of the Web

You can access the preview of this project in [here](http://andikay.me)

## How to use

```bash
git clone https://github.com/dikaaayy/spotify-web-player.git
npm install
```

After that setup the required environment variables at the root directory such as below
```.env.local``` 
```bash
NEXTAUTH_URL=http://localhost:3000 #default route of the application
NEXT_PUBLIC_CLIENT_SECRET=xxxxxxxxxxxxxxxxxxxxx #get your credentials at https://developer.spotify.com/dashboard/
NEXT_PUBLIC_CLIENT_ID=xxxxxxxxxxxxxxxxxxxxx #get your credentials at https://developer.spotify.com/dashboard/
JWT_SECRET=xxxxxxxxxxxxxxxx #your JWT secret
```

Finally, run the program with
```bash
npm run dev
```
