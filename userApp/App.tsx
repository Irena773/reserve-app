import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Image,TouchableOpacity, } from 'react-native';

export default function App() {
  return (
    <View style={styles.App}>
      <Image source={require('./images/app-logo.png')}/>

      <Text style={styles.blackLine}></Text>
      <Text style={styles.normalText}>浜松幸店</Text>
      
      <Text style={styles.normalText}>お客様の受付番号</Text>
      <Text style={styles.userNumber}>2番</Text>
      
      <Text style={styles.normalText}>査定待ち人数</Text>
      <Text style={styles.waitingNum}>２人</Text>  

      <TouchableOpacity style={styles.redButton}><Text style={styles.statusText}>査定中</Text></TouchableOpacity>  
      <Text style={styles.caution}>買い取りが成立した場合、ご本人様確認ができる書類(免許証、マイナンバーカード等)が必要です。ご準備ください。</Text>
      
    </View>
  );
}

const styles = StyleSheet.create({
  App:{
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    // flex:0.85,
    marginTop:50,
  },
  blackLine:{
    width: 390,
    height: 1,
    backgroundColor: '#000000',
    marginTop:10,
    marginBottom: 20,
  },
  normalText:{
    fontSize: 24,
    fontWeight: 'bold',
    color: 'rgba(84,80,80,1)',
    margin: 10
  },
  userNumber:{
    fontSize: 40,
    fontWeight: 'bold',
    color: 'rgba(84,80,80,1)',
    margin: 15
  },
  waitingNum:{
    fontSize: 30,
    fontWeight: 'bold',
    color: 'rgba(84,80,80,1)',
    margin:20,
    
  },
  statusText:{
    fontSize: 30,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  caution:{
    fontSize:18,
    color: 'rgba(84,80,80,1)',
    margin: 30
  },
  redButton:{
    width: 300,
    height: 125,
    backgroundColor: '#DB020D',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35
  }
});


// import sys

// def main():
//     H,W = map(int, input().split())
//     S=[]
//     for i in range(H):
//         tmp = input()
//         S.append(list(tmp))
//     T = input()
    
//     for i in range(W):
//         if S[0][i] == T[0]:
//             print(1)
//             exit()

//     print(0)        
// if __name__ == '__main__':
    
//     main()
