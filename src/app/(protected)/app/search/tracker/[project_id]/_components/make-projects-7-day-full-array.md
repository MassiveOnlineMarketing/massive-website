import { format, parse } from 'date-fns';

let reversedData = [...props].reverse().map(item => {
        let date = new Date(item.createdAt);
        return { ...item, createdAt: date.toLocaleDateString('en-GB') };
    });

    console.log('reversedProps', reversedData)

    let chartData = reversedData.map(item => ({ ...item }));

    console.log('props', reversedData.length)
    if (reversedData.length < 7) {
        const additionalEntries = 7 - reversedData.length;
        for (let i = 0; i < additionalEntries; i++) {
            chartData.push({
                improved: 0,
                worsened: 0,
                total: 0,
                topThree: 0,
                topTen: 0,
                topHundred: 0,
                noChange: 0,
                notFound: 0,
                averagePosition: 0,
                createdAt: '0',
                id: '',
                projectId: ''
            })
        }
        console.log('test', chartData)
    }