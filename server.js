import { spawn } from "child_process";
import { path as ffmpegPath } from "@ffmpeg-installer/ffmpeg";
import RtspServer from 'rtsp-streaming-server';
import { config } from "./config";

const initRTSPCompressedInstances = rtspList => {
  const option = {
    serverPort: 8554,
    clientPort: 554,
    rtpPortStart: 10000,
    rtpPortCount: 10000,
    mounts: {}
  };
  
  rtspList.forEach(({ rtspId }) => {
    option.mounts[`/${rtspId}`] = {
      write: true,
      read: true
    };
  });

  console.log('RTSP Server Configuration:', option);


  const server = new RtspServer(option);

  server.start()
    .then(() => {
      console.log('RTSP server started');
      
      rtspList.forEach(({ rtspId, filepath }) => {
        const ffmpegProcess = spawn(ffmpegPath, [
          "-re", // Read input at native frame rate
          "-stream_loop", "-1", // Loop indefinitely
          "-i", filepath,
          "-c", "copy",
          "-f", "rtsp",
          `rtsp://127.0.0.1:8554/${rtspId}`
        ], {
          detached: false,
          windowsHide: true,
        });

        ffmpegProcess.stdout.on("data", (chunk) => {
          // console.log('stdout:', chunk.toString());
        });
        
        ffmpegProcess.stderr.on("data", (chunk) => {
          // console.log('stderr:', chunk.toString());
        });
        
        ffmpegProcess.on("close", (code) => {
          // console.log(`ffmpeg process closed with code ${code}`);
        });
      });
    })
    .catch(err => {
      console.error('Error starting RTSP server:', err);
    });
};

initRTSPCompressedInstances(config.rtspListTest);
