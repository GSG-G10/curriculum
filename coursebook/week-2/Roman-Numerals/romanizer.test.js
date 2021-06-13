let romanizer = require('./romanizer');

test('1 equal I by Roman numers', () =>{
    let actual = romanizer(1);
    let expected = 'I'; 
    expect(actual).toEqual(expected);
})

test('2 equal II by Roman numers', () =>{
    let actual = romanizer(2);
    let expected = 'II'; 
    expect(actual).toEqual(expected);
})

test('3 equal III by Roman numers', () =>{
    let actual = romanizer(3);
    let expected = 'III'; 
    expect(actual).toEqual(expected);
})

test('4 equal VI by Roman numers', () =>{
    let actual = romanizer(4);
    let expected = 'IV'; 
    expect(actual).toEqual(expected);
})

test('5 equal V by Roman numers', () =>{
    let actual = romanizer(5);
    let expected = 'V'; 
    expect(actual).toEqual(expected);
})

test('6 equal VI by Roman numers', () =>{
    let actual = romanizer(6);
    let expected = 'VI'; 
    expect(actual).toEqual(expected);
})

test('7 equal VII by Roman numers', () =>{
    let actual = romanizer(7);
    let expected = 'VII'; 
    expect(actual).toEqual(expected);
})

test('8 equal VIII by Roman numers', () =>{
    let actual = romanizer(8);
    let expected = 'VIII'; 
    expect(actual).toEqual(expected);
})

test('9 equal IX by Roman numers', () =>{
    let actual = romanizer(9);
    let expected = 'IX'; 
    expect(actual).toEqual(expected);
})

test('10 equal X by Roman numers', () =>{
    let actual = romanizer(10);
    let expected = 'X'; 
    expect(actual).toEqual(expected);
})

test('11 equal XI by Roman numers', () =>{
    let actual = romanizer(11);
    let expected = 'XI'; 
    expect(actual).toEqual(expected);
})

test('12 equal XII by Roman numers', () =>{
    let actual = romanizer(12);
    let expected = 'XII'; 
    expect(actual).toEqual(expected);
})
test('13 equal XIII by Roman numers', () =>{
    let actual = romanizer(13);
    let expected = 'XIII'; 
    expect(actual).toEqual(expected);
})

test('14 equal XIV by Roman numers', () =>{
    let actual = romanizer(14);
    let expected = 'XIV'; 
    expect(actual).toEqual(expected);
})

test('20 equal XX by Roman numers', () =>{
    let actual = romanizer(20);
    let expected = 'XX'; 
    expect(actual).toEqual(expected);
})

test('30 equal XXX by Roman numers', () =>{
    let actual = romanizer(30);
    let expected = 'XXX'; 
    expect(actual).toEqual(expected);
})

test('40 equal XL by Roman numers', () =>{
    let actual = romanizer(40);
    let expected = 'XL'; 
    expect(actual).toEqual(expected);
})

test('41 equal XLI by Roman numers', () =>{
    let actual = romanizer(41);
    let expected = 'XLI'; 
    expect(actual).toEqual(expected);
})

test('50 equal L by Roman numers', () =>{
    let actual = romanizer(50);
    let expected = 'L'; 
    expect(actual).toEqual(expected);
})

test('1500 equal MD by Roman numers', () =>{
    let actual = romanizer(1500);
    let expected = 'MD'; 
    expect(actual).toEqual(expected);
})


test('4000 equal MMMMCMXCVIII by Roman numers', () =>{
    let actual = romanizer(4000);
    let expected = 'MMMM'; 
    expect(actual).toEqual(expected);
})

test('4997 equal MMMMCMXCVIII by Roman numers', () =>{
    let actual = romanizer(4997);
    let expected = 'MMMMCMXCVII'; 
    expect(actual).toEqual(expected);
})

test('4998 equal MMMMCMXCVIII by Roman numers', () =>{
    let actual = romanizer(4998);
    let expected = 'MMMMCMXCVIII'; 
    expect(actual).toEqual(expected);
})

test('4999 equal MMMMCMXCIX by Roman numers', () =>{
    let actual = romanizer(4999);
    let expected = 'MMMMCMXCIX'; 
    expect(actual).toEqual(expected);
})

test('5000 out of limit', () =>{
    let actual = romanizer(5000);
    let expected = 'out of limit'; 
    expect(actual).toEqual(expected);
})

test('-1 out of limit', () =>{
    let actual = romanizer(-1);
    let expected = 'out of limit'; 
    expect(actual).toEqual(expected);
})

test('abc Not a number', () =>{
    let actual = romanizer('abc');
    let expected = "Not a Number"; 
    expect(actual).toEqual(expected);
})