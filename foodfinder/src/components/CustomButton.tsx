import {TouchableOpacity, Text, StyleSheet} from 'react-native';

interface Props{
    title: string;
    onPress: () => void;
}

export default function CustomButton({
    title,
    onPress
}:Props){

    return(
        <TouchableOpacity style={styles.button} onPress={onPress}>
            <Text style={styles.text}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles=StyleSheet.create({

    button:{
        backgroundColor:"#FF7A00",
        padding:15,
        borderRadius:10,
        alignItems:"center"
    },

    text:{
        color:"white",
        fontWeight:"bold"
    }

});