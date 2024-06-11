import "dotenv/config";

const numberOfStreams = 1; // Change this to the number of RTSP streams you have
const rtspListTest = [];

for (let i = 1; i <= numberOfStreams; i++) {
  rtspListTest.push({
    rtspId: i,
    filepath: process.env[`RTSP_${i}_FILEPATH`]
  });
}

console.log(rtspListTest);


export const config = {
  rtspListTest
};
