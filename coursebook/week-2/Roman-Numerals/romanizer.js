let values = [
{
  arabic: 4000,
  roman : "MMMM"
},
  
{
  arabic: 1000,
  roman : "M"
},
{
  arabic: 900,
  roman : "CM"
},
{
  arabic: 500,
  roman : "D"
},
{
  arabic: 400,
  roman : "CD"
},
{
  arabic: 100,
  roman : "C"
},
{
  arabic: 90,
  roman : "XC"
},{
    arabic: 50,
    roman: 'L'
  },
  {
    arabic: 40,
    roman: 'XL'
  }
  ,{
    arabic : 20,
    roman : 'XX'
   }
  ,{
    arabic : 10,
    roman : 'X'
   }
  ,{
    arabic : 9,
    roman : 'IX'
   }
  ,{
    arabic : 5,
    roman : 'V'
   }
  ,{
   arabic : 4,
   roman : 'IV'
  }
]

function romanizer(num){
let remaining = num ;  
let result = '';
if (isNaN(remaining)){
  return "Not a Number";
}
if (remaining >=5000  || remaining <= 0){
  return "out of limit";
}

values.forEach( value  => {
  if (remaining >= value.arabic){
    result += value.roman; 
    remaining -= value.arabic;
  }
})

 while (remaining > 0 ){
  result += 'I',
  remaining -= 1;
 }
 
 return result; 
}

module.exports = romanizer;
