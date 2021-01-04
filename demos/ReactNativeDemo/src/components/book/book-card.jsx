import React, { Fragment } from 'react';
import { View, Image, Text, Button } from 'react-native';
import { ButtonText, ButtonWrapper } from 'components/basics/buttons';

const BookListCard = (props) => {
	const { book = {}, loading, onPress } = props;

	// Render
	return (
    <ButtonWrapper onPress={() => onPress(book)} style={{padding: 15, marginBottom: 15, width: '100%'}}>
        <Text>{book.printType}</Text>
        <Text style={{fontSize: 16, fontWeight: '500'}}>{book.title}</Text>
        <Text>{book.previewDescription}</Text>
    </ButtonWrapper>
	)
}

export { BookListCard }
