import { useEffect, useState } from 'react';

const SMSCalculator = {
    encoding: {
        UTF16: [70, 64, 67],
        GSM_7BIT: [160, 146, 153],
        GSM_7BIT_EX: [160, 146, 153],
    },
    charset: {
        gsmEscaped: '\\^{}\\\\\\[~\\]|€',
        gsm: '@£$¥èéùìòÇ\\nØø\\rÅåΔ_ΦΓΛΩΠΨΣΘΞÆæßÉ !"#¤%&\'()*+,-./0123456789:;<=>?¡ABCDEFGHIJKLMNOPQRSTUVWXYZÄÖÑÜ§¿abcdefghijklmnopqrstuvwxyzäöñüà',
    },
    regex: function () {
        return {
            gsm: new RegExp(`^[${this.charset.gsm}]*$`),
            gsmEscaped: new RegExp(`^[\\${this.charset.gsmEscaped}]*$`),
            gsmFull: new RegExp(`^[${this.charset.gsm}${this.charset.gsmEscaped}]*$`),
        };
    },
    detectEncoding: function (text) {
        if (text.match(this.regex().gsm)) {
            return this.encoding.GSM_7BIT;
        } else if (text.match(this.regex().gsmFull)) {
            return this.encoding.GSM_7BIT_EX;
        } else {
            return this.encoding.UTF16;
        }
    },
    getEscapedCharCount: function (text) {
        return [...text].reduce((acc, char) => acc + (char.match(this.regex().gsmEscaped) ? 1 : 0), 0);
    },
    getPartData: function (totalLength, encoding) {
        let numberOfSMS = Math.ceil(totalLength / encoding[2]);
        let maxCharCount = encoding[2];
        let segmentThreshold = maxCharCount * numberOfSMS;
        let remaining = segmentThreshold - totalLength;

        if (totalLength <= encoding[0]) {
            maxCharCount = encoding[0];
            numberOfSMS = 1;
            remaining = maxCharCount;
        } else if (totalLength > encoding[0] && totalLength <= (encoding[0] + encoding[1])) {
            maxCharCount = encoding[1];
            numberOfSMS = 2;
            remaining = maxCharCount;
        } else if (totalLength > encoding[1]) {
            remaining = segmentThreshold - totalLength;
        }

        return {
            maxCharCount,
            numberOfSMS,
            remaining: maxCharCount, // Set remaining as the fixed max until a new segment starts
            incrementalLength: totalLength,
        };
    },
    getCount: function (text) {
        let length = text.length;
        const encoding = this.detectEncoding(text);

        if (encoding === this.encoding.GSM_7BIT_EX) {
            length += this.getEscapedCharCount(text);
        }

        return this.getPartData(length, encoding);
    },
};

const SmsCalculator = ({ text, onCalculation }) => {
    const [smsInfo, setSmsInfo] = useState({ remaining: 0, numberOfSMS: 1, encoding: 'GSM_7BIT' });

    useEffect(() => {
        const encoding = SMSCalculator.detectEncoding(text);
        const count = SMSCalculator.getCount(text);
        setSmsInfo({ ...count, encoding });

        if (onCalculation) {
            onCalculation({
                textLength: count.incrementalLength,
                remaining: count.remaining,
                numberOfSMS: count.numberOfSMS,
                encoding: encoding === SMSCalculator.encoding.UTF16 ? 'UCS2' : 'GSM 7'
            });
        }
    }, [text]);

    return null;
};

export default SmsCalculator;
