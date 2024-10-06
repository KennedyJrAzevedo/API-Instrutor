const express = require( 'express' )
const app = express()
app.use( express.json() )

const employees = []

const classes = []

function verifyIfEmployeeAlreadyExists ( req, res, next )
{
    const { employeeRegistration } = req.body
    const employeeAlreadyExists = employees.some( ( employee ) =>
    {
        employee.employeeRegistration === employeeRegistration
    } )
    if ( employeeAlreadyExists )
    {
        return res.status( 400 ).json( {
            error: "Employee already exists!"
        } )
    }
    return next()
}

function verifyIfClassAlreadyExists ( req, res, next )
{
    const { id } = req.body
    const classAlreadyExists = classes.some( ( classId ) =>
    {
        return classId.id === id
    } )
    if ( classAlreadyExists )
    {
        return res.status( 400 ).json( {
            error: "Class already exists!"
        } )
    }
    return next()
}
function nameFormatted ( name )
{  
    return name.toUpperCase()
}

function cpfFormatted ( cpf )
{
    return console.log( cpf.substring( 0, 3 ) + "." + cpf.substring( 3, 6 ) + "." + cpf.substring( 6, 9 ) + "." + cpf.substring( 9, 11 ) )
}

function cellFormatted ( number )
{
    return number.substring( 0, 3 ) + "(" + number.substring( 3, 5 ) + ")" + number.substring( 5, 10 ) + "-" + number.substring( 10, 14 )
}

function dateFormatted ()
{
    const newdate = new Date()
    const year = newdate.getFullYear()
    const month = newdate.getMonth()
    const day = newdate.getDate()
    return `${ day }/${ month }/${ year }`
}

function verifyIfEmployeeExists ( req, res, next )
{
    const { employeeRegistration } = req.body
    const employee = employees.find( ( employee ) =>
    {
        return employee.employeeRegistration === employeeRegistration
    } )
    if ( !employee )
    {
        return res.status( 400 ).json( {
            error: "Employee not found!"
        } )
    }
    req.employee = employee
    return next()
}

function verifyIfClassExists ( req, res, next )
{
    const { id } = req.body
    const classId = classes.find( ( classId ) =>
    {
        return classId.id == id
    } )
    if ( !classId )
    { 
        return res.status( 400 ).json( {
            error: "Class not found!"
        } )
    }
    req.classId = classId
    return next()
}

function verifyIfClassAlreadyLinkedEmployee ( req, res, next )
{
    const { id } = req.body
    const { employee } = req
    if ( employee.class.indexOf( id ) === -1 )
    {
        return next()
    } else
    {
        return res.status( 400 ).json( {
            error: "Class already linked!"
        } )
    }
}

function verifyIfClassLinkedEmployee ( req, res, next )
{
    const { classId } = req
    for ( const valueEmployee of employees )
    {
        for ( const valueClass of valueEmployee.class )
        {
            if ( valueClass === classId.id )
            {
                return res.status( 400 ).json( {
                    error: "Class linked at employee"
                } )
            }
        }
    }
    return next()
}

function verifyLogin ( req, res, next )
{
    const { cpf, password } = req.headers
    const searchByCPF = employees.find( ( searchByCPF ) =>
    {
        return searchByCPF.cpf === cpfFormatted( cpf )
    } )
    if ( !searchByCPF )
    {
        return res.status( 400 ).json( {
            error: "Employee not found!"
        } )
    }
    if ( searchByCPF.cpf === cpfFormatted( cpf ) && searchByCPF.password === password )
    {
        return next()
    } else
    {
        return res.status( 400 ).json( {
            error: "Invalid login!"
        } )
    }
}

app.post( '/register/employee', verifyIfEmployeeAlreadyExists, ( req, res ) =>
{
    const { name, employeeRegistration, password, cpf, email, birthDate, cellphone } = req.body
    employees.push( {
        name: nameFormatted( name ),
        employeeRegistration,
        cpf: cpfFormatted(cpf) ,
        password,
        email,
        birthDate,
        cellphone: cellFormatted( cellphone ),
        createdAt: dateFormatted(),
        class: []
    } )


    return res.status( 201 ).json( {
        status: "Created"
    } )
} )

app.post( '/register/class', verifyIfClassAlreadyExists, ( req, res ) =>
{
    const { name, id } = req.body
    classes.push( {
        name,
        id,
        createdAt: dateFormatted()
    } )
    res.status( 201 ).json( {
        created: "true"
    } )
} )

app.patch( '/register/employee/class', verifyIfEmployeeExists, verifyIfClassExists, verifyIfClassAlreadyLinkedEmployee, ( req, res ) =>
{
    const { employee } = req
    const { id } = req.body
    employee.class.push( id )
    return res.status( 201 ).json( {
        employee: employee.id,
        classId: id
    })
} )

app.get( '/employees', ( req, res ) =>
{
    return res.status( 200 ).send( employees )
} )

app.get( '/search/registration', verifyIfEmployeeExists, ( req, res ) =>
{
    const { employee } = req
    return res.status( 200 ).send( employee )
} )

app.get( '/search/cpf', ( req, res ) =>
{
    const { cpf } = req.body
    const searchByCPF = employees.find( ( searchByCPF ) =>
    {
        return searchByCPF.cpf === cpfFormatted( cpf )
    } )
    if ( !searchByCPF )
    {
        return res.status( 400 ).json( {
            error: "Employee not found!"
        } )
    }
    return res.status( 200 ).send( searchByCPF )
} )

app.get( '/search/name', ( req, res ) =>
{
    const { name } = req.body
    const searchByName = employees.find( ( searchByName ) =>
    {
        return searchByName.name === name
    } )
    if ( !searchByName )
    {
        return res.status( 400 ).json( {
            error: "Name not found!"
        } )
    }
    return res.status( 200 ).send( searchByName )
} )

app.get( '/classes', ( req, res ) =>
{
    return res.status( 200 ).send( classes )
} )

app.get( '/search/classes/registration', verifyIfEmployeeExists, ( req, res ) =>
{
    const { employee } = req
    return res.status( 200 ).send( employee.class )
} )

app.get( '/search/class', verifyIfClassExists, ( req, res ) =>
{
    const { classId } = req
    return res.status( 200 ).send( classId )
} )

app.put( '/employee', verifyLogin, ( req, res ) =>
{
    const { name, password, email, birthDate, cellphone } = req.body
    const { cpf } = req.headers
    const searchByCPF = employees.find( ( searchByCPF ) =>
    {
        return searchByCPF.cpf === cpfFormatted( cpf )
    } )
    if ( !searchByCPF )
    {
        return res.status( 400 ).json( {
            error: "Employee not found!"
        } )
    }
    searchByCPF.name = nameFormatted( name )
    searchByCPF.password = password
    searchByCPF.email = email
    searchByCPF.birthDate = birthDate
    searchByCPF.cellphone = cellFormatted( cellphone )
    return res.status( 200 ).json( {
        status: "Updated"
    })
} )

app.delete( '/employee', verifyIfEmployeeExists, ( req, res ) =>
{
    const { employee } = req
    const index = employees.indexOf( employee )
    employees.splice( index, 1 )
    return res.status( 200 ).json( employees )
} )

app.delete( '/class', verifyIfClassExists, verifyIfClassLinkedEmployee, ( req, res ) =>
{
    const { classId } = req
    const index = classes.indexOf( classId )
    classes.splice( index, 1 )
    return res.status( 200 ).json( classes )
} )
app.listen( 3333, () =>
{
    console.log( 'Servidor rodando :)' )
} )