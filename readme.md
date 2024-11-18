# Trim Audio Tracks

A small app to trim audio tracks in Matroska and Mpeg4 video containers. I used
it to trim unwanted audio tracks from backups of movies and TV shows from my
BluRay and DVD collection. When watching backups I prefer to only use external
text based subtitle files and save space by not keeping commentary tracks or
dubs.

## Prerequisites

To run this you need [mkvmerge](https://mkvtoolnix.download/doc/mkvmerge.html)
and [ffmpeg](https://ffmpeg.org) installed.

## Usage

Just pass the path of a video file to the app, select the audio tracks you want
to keep from the list using arrow keys to navigate and space to select, then
press enter to remux the video file to a new one with all embedded subtitles
stripped and only the selected audio tracks remaining.

Either set the script as executeable and run it as is:

```bash
chmod +x ./src/main.ts
./src/main.ts /path/to/container/file.mkv
```

Or compile the script to a standalone app with the `compile` script and put it
in a reasonable place for your operating system, for example `/user/local/bin`
on Ubuntu:

```bash
deno compile
sudo mv dist/trim-audio-tracks /user/local/bin/
sudo chmod +x /user/local/bin/trim-audio-tracks
```

Now the app is available on your path and you can run it anywhere:

```bash
trim-audio-tracks video-file.mp4
```

## Development

This project uses [Deno](https://docs.deno.com/runtime/) for runtime and
[ask](https://jsr.io/@sallai/ask) for prompts. You need to install Deno to run
or compile the app. If you are using Visual Studio Code for development, there
are suggested extensions to install.

## Future Improvments

- Add option to keep embedded subtitles
- Add option to keep specific subtitle tracks
- More graceful exit
- Option to scan directories for video files with more than one audio track
- Pre-select assumed correct audio track(s)
- Show some kind of progress bar and/or estimate on finish time
- Add build in ci and release artifact so the app can be installed from Github
