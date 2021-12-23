import React from 'react';
import person1 from "assets/person1.jpeg"
import person2 from "assets/person2.jpeg"
import person3 from "assets/person3.jpeg"
import person4 from "assets/person4.jpeg"

const persons = [person1, person2, person3, person4];


export const getPersonImage = (index) => {
    return persons[index]
}