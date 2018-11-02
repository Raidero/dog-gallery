export abstract class RestHelper {
    public static getImages = async (headers: object) => {
        let url = process.env.REACT_APP_FLICKR_API_URL || '';
        
        // tslint:disable-next-line:forin
        for (const headerName in headers) {
          url += headerName + '=' + headers[headerName] + '&';
        }
    
        try {
          const response = await fetch(url);
          if (response.ok) {
            return await response.json();
          } else {
            throw new Error('Data fetch failed due to server error, bad response');
          }
        } catch (error) {
          // tslint:disable-next-line:no-console
          console.error(error);
        }
        return null;
    }

    public static standardHeaders = (pageNumber: number, tag: string) => ({
        api_key: '0ca1eb4259874ebb14050c0271584392',
        extras: 'date_upload,owner_name,url_z',
        format: 'json',
        method: 'flickr.photos.search',
        nojsoncallback: 1,
        page: pageNumber,
        text: tag !== '' ? tag : 'faces'
    });
}