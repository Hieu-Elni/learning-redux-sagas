const styles = (theme) => ({
    modal:{
        position: 'absolute',
        width: 400,
         backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        // padding: theme.spacing(2, 4, 3),
        top:'50%',
        left:'50%',
        transform: 'translate(-50%, -50%)',
    },
    textField:{
        width: '100%'
    },
    header:{
        backgroundColor:theme.color.primary,
        color:theme.color.textColor,
        padding: theme.spacing(2),
        display: 'flex',
        alignItems: 'center',
        fontSize:24,
        justifyContent:'space-between'
    },
    title:{

    },
    content:{
        padding: theme.spacing(2),
    },
});

export default styles;