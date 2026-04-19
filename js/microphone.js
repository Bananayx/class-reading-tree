const MicrophoneManager = {
    async init() {
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const analyser = audioContext.createAnalyser();
            const microphone = audioContext.createMediaStreamSource(stream);
            
            microphone.connect(analyser);
            analyser.fftSize = 256;
            
            return {
                audioContext,
                analyser,
                microphone,
                dataArray: new Uint8Array(analyser.frequencyBinCount)
            };
        } catch (err) {
            console.error('无法访问麦克风:', err);
            throw err;
        }
    },

    getVolume(analyser, dataArray) {
        analyser.getByteFrequencyData(dataArray);
        let sum = 0;
        for (let i = 0; i < dataArray.length; i++) {
            sum += dataArray[i];
        }
        return Math.round(sum / dataArray.length);
    },

    cleanup(audioContext) {
        if (audioContext) {
            audioContext.close();
        }
    }
};
