Rlog = {
  parseQuestions: function( code ){
    return RlogParser.parse( code );
    // var r = /\?([\w+\.]+)\s*=\s*({.*})/;
    // var q = r.exec( code.split('\n').join('').split('\r').join('') ); 
    // if( q.length > 0 )
    //   return {
    //     name: 'question',
    //     key: q[1],
    //     validator: JSON.parse( q[2] )
    //   }
    // return null;
  },
  stringify: function( o ){
    if(o.name === 'question') {
      return "?"+o.key+" = "+JSON.stringify(o.validator, false, 2);
    }
  }
}
