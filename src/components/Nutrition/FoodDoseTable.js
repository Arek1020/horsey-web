import React, { useState, useEffect } from 'react'
import {
    Box,
    Card,
    TextField,
    CardMedia,
    CardContent,
    Typography,
    IconButton,
    CardActions,
    Button
} from '@mui/material';
import TrashIcon from '@mui/icons-material/DeleteOutline';
import { themeOptions } from '../../utils/ThemeConfig';
import AddTableRowModal from './AddTableRowModal';
import AddCommentModal from './AddCommentModal';
import AddIcon from '@mui/icons-material/Add';

export default function FoodDoseTable({ values, rows, setRows }) {


    // useEffect(() => {
    //     if(values?.foodDose?.length)
    //         setRows(JSON.parse(values.foodDose[0]?.data || '[]'))
    // }, [])

    const [addRowVisible, setAddRowVisible] = useState(false)

    const addRow = () => {
        let tmpRows = JSON.parse(JSON.stringify(rows));
        tmpRows.push(
            {
                id: tmpRows[tmpRows.length - 1].id + 1,
                list: [],
                comments: []
            }
        );
        setRows(tmpRows)
        setAddRowVisible(false)
    }

    const addTableRow = (values) => {
        let tmpRows = JSON.parse(JSON.stringify(rows));
        for (var r of tmpRows) {
            if (r.id == values.id) {
                let id = 0;
                if (r.list.length > 0)
                    id = r.list.length + 1;
                r.list.push({ id: id, name: values.name, amount: values.amount })

            }
        }
        setRows(tmpRows)
    }

    const removeTableRow = (values) => {
        let tmpRows = JSON.parse(JSON.stringify(rows));

        for (var r of tmpRows) {
            if (r.id == values.rowId)
                r.list = r.list.filter(x => x.id != values.tableRow.id)
        }

        setRows(tmpRows)
    }


    const addComment = (values) => {
        let tmpRows = JSON.parse(JSON.stringify(rows));
        for (var r of tmpRows) {
            if (r.id == values.id) {
                let id = 0;
                if (r.comments.length > 0)
                    id = r.comments.length + 1;
                r.comments.push({ id, content: values.content })

            }
        }
        setRows(tmpRows)
    }

    const removeComment = (values) => {
        let tmpRows = JSON.parse(JSON.stringify(rows));

        for (var r of tmpRows) {
            if (r.id == values.rowId)
                r.comments = r.comments.filter(x => x.id != values.id)
        }

        setRows(tmpRows)
    }



    useEffect(() => {
        if (rows[rows?.length - 1]?.list.length > 0)
            setAddRowVisible(true);
        else
            setAddRowVisible(false);
    }, [rows])

    return (
        <Box style={{ marginBottom: 10 }}>
            {rows.length ? rows.map(row => {
                return (
                    <Box key={row?.id} style={styles.row}>
                        <Box style={styles.header}>
                            <Box style={styles.title}>
                                <Typography style={styles.titleText}>Posiłek {row.id}</Typography>
                            </Box>
                            <AddCommentModal rowId={row.id} handleSubmit={addComment} />
                        </Box>
                        <Box style={styles.content}>
                            <Box style={styles.table}>
                                <div style={styles.tableHeader}>
                                    <Typography style={styles.tableHeaderText1}>Nazwa paszy</Typography>
                                    <Typography style={styles.tableHeaderText2}>Ilość</Typography>
                                </div>
                                <Box style={styles.tableContent}>
                                    {row.list.map(tableRow => {
                                        return (
                                            <div key={tableRow.id} style={styles.tableRow}>
                                                <Typography style={{ width: '70%', fontSize: 18 }}>{tableRow.name}</Typography>
                                                <Typography style={{ width: '20%', fontSize: 18 }}>{tableRow.amount}</Typography>
                                                <Button onClick={() => { removeTableRow({ tableRow, rowId: row.id }) }}>
                                                    <TrashIcon />
                                                </Button>
                                            </div>
                                        )
                                    })}

                                    <Box style={{ width: '100%' }}>
                                        <AddTableRowModal rowId={row.id} handleSubmit={addTableRow} />
                                    </Box>

                                </Box>
                            </Box>
                        </Box>

                        {row.comments.map(comment => {
                            return (
                                <Box style={{ backgroundColor: '#F5F5F5', padding: 10, width: '70%', margin: 'auto', marginTop: 15, marginBottom: 15 }} key={comment.id}>
                                    <Typography style={{ width: '90%', fontSize: 14, color: 'rgb(171, 170, 170)' }}>Uwaga</Typography>

                                    <Box style={styles.commentRow}>
                                        <Typography style={{ width: '90%', fontSize: 18 }}>{comment.content}</Typography>
                                        <Button onClick={() => { removeComment({ id: comment.id, rowId: row.id }) }}>
                                            <TrashIcon />
                                        </Button>
                                        {/* <TouchableOpacity onPress={() => { removeComment({ id: comment.id, rowId: row.id }) }}>
                                            <Icon
                                                name="trash-can-outline"
                                                color={theme.colors.primary}
                                                size={28}
                                                style={{ alignSelf: 'center' }}
                                            />
                                        </TouchableOpacity> */}
                                    </Box>
                                </Box>
                            )
                        })}
                    </Box>
                )
            })
                :
                <Typography>Brak dawki pokarmowej</Typography>
            }
            {addRowVisible && (
                <Box style={{ display: 'flex', alignItems: 'center' }}>
                    <Button style={styles.title} onClick={addRow}>
                        <AddIcon style={{ margin: 'auto' }} />
                    </Button>
                    <Typography style={{ ...styles.tableHeaderText2, marginLeft: 10 }}>Dodaj kolejny posiłek</Typography>
                </Box>
            )}
        </Box>
    )
}

const styles = {
    row: {
        marginBottom: 20
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    title: {
        backgroundColor: themeOptions.colors.primary,
        width: 100,
        padding: 10,
        color: '#fff',
        display: 'flex',
        alignItems: 'center',
        textAlign: 'center',
        marginTop: 10,
        marginLeft: 10
    },
    titleText: {
        color: 'white',
        fontSize: 16,
        alignSelf: 'center',
        display: 'flex',
        alignItems: 'center',
        margin: 'auto'
    },
    table: {
        width: '90%',
        margin: 'auto'
    },
    tableHeader: {
        height: 30,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        borderBottomColor: 'rgb(171, 170, 170)',
        borderBottomWidth: 1,
        borderBottomStyle: 'solid',
        marginTop: 10
    },
    tableHeaderText1: {
        width: '60%',
        color: 'rgb(171, 170, 170)'

    },
    tableHeaderText2: {
        color: 'rgb(171, 170, 170)'

    },
    tableRow: {
        display: 'flex',
        flexDirection: "row",
        alignItems: "center",
        minHeight: 50,
        margin: 2,
        paddingLeft: 5,
        paddingRight: 5,
        backgroundColor: '#F5F5F5'
    },
    commentRow: {
        width: '100%',
        display: 'flex',
        flexDirection: "row",
        alignItems: "center",
        minHeight: 50,
        margin: 2,
        padding: 2,
        backgroundColor: '#F5F5F5'
    }
}
