  /**
   * 查找不重复的数（地狱模式）
   * 
   * 問題描述
   * 有一个数组，内容为[1, 3, 4, 5, 7, 4, 8, 9, 2, 9]，有些数值是重复出现的，
   * 改造BitMap类，增加一个isRepeat(member)方法，判断member是否重复出现，并利用该方法找出数组中不重复的数。
   * 
   * 思路分析
   * 用一个bit位可以表示一个数是否存在，但无法表示这个数是否重复，
   * 因为一个bit位只有两个状态，恰好对应数的存在与否，
   * 那么我们可以用兩个bit位来表示一个数的存在与否以及是否重复，这样，一个32位整数，可以表示16个数的存在与否以及重复与否。
   * 
   * 以0为例，addMember(0)时，第0个bit位置为1，二进制表示可以写成
   * 00000000 00000000 00000000 00000001
   * 再次addMember(0)时，通过isExist(0)判断0已经存在，那么就把第1个bit位置为1，表示0重复出现，二进制表示如下
   * 00000000 00000000 00000000 00000011
   * 这样，需要判断0是否存在是，要检查第0个bit位是否为1，判断0是否重复时，要检查第1个bit位是否1
   */

  function NewBitMap(size) {
      var bit_arr = new Array(size);
      for (var i = 0; i < bit_arr.length; i++) {
          bit_arr[i] = 0;
      }

      this.addMember = function(member) {
          var arr_index = Math.floor(member / 16);
          var bit_index = member % 16;
          if (!this.isExist(member)) {
              bit_arr[arr_index] = bit_arr[arr_index] | 1 << bit_index * 2;
          } else {
              bit_arr[arr_index] = bit_arr[arr_index] | 1 << (bit_index * 2 + 1);
          }
      }
      this.isExist = function(member) {
          var arr_index = Math.floor(member / 16);
          var bit_index = member % 16;
          var value = bit_arr[arr_index] & 1 << bit_index * 2;
          if (value != 0) {
              return true;
          }
          return false;
      }
      this.isRepeat = function(member) {
          // var arr_index = parseInt(member / 16);
          var arr_index = Math.floor(member / 16);
          var bit_index = member % 16;
          var value = bit_arr[arr_index] & 1 << (bit_index * 2 + 1);
          if (value != 0) {
              return true;
          }
          return false;
      }
  }


  /*
  //測試將給出數組中不重復的加入新數組

  var arr_1 = [1, 3, 4, 5, 7, 4, 8, 9, 2, 9];
  var bm = new NewBitMap(2);
  for (var i = 0; i < arr_1.length; i++) {
      bm.addMember(arr_1[i]);
  }
  var arr = []

  arr_1.forEach((i) => {
      if (!bm.isRepeat(i)) {
          arr.push(i);
      }
  })

  console.log(arr); //[ 1, 3, 5, 7, 8, 2 ]
  */