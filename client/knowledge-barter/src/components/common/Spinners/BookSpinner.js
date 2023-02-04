import './BookSpinner.css'

export const BookSpinner = () => {
    return (
        <div className="book">
            <div className="book__pg-shadow" />
            <div className="book__pg" />
            <div className="book__pg book__pg--2" />
            <div className="book__pg book__pg--3" />
            <div className="book__pg book__pg--4" />
            <div className="book__pg book__pg--5" />
        </div>
    )
}