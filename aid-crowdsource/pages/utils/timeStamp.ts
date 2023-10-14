const timeStamp = () => {
    const dt = new Date();
    const ts = Math.floor(dt.getTime() / 1000); 
    const dt2 = new Date(ts * 1000); 
    const year = dt2.getFullYear();
    const month = String(dt2.getMonth() + 1).padStart(2, '0');
    const day = String(dt2.getDate()).padStart(2, '0');
    const hours = String(dt2.getHours()).padStart(2, '0');
    const minutes = String(dt2.getMinutes()).padStart(2, '0');
    const seconds = String(dt2.getSeconds()).padStart(2, '0');
    const timestamp = `${year}${month}${day}${hours}${minutes}${seconds}`;
    
    return timestamp;
}

export default timeStamp