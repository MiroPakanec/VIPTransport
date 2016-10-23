function GetViewPort(){

    var viewport = $( window ).width();

    if( viewport < 768 ) {
        return 'xs'
    }

    if( viewport < 992 ) {
        return 'sm'
    }

    if( viewport < 1200 ) {
        return 'md'
    }

    return 'lg';
}
