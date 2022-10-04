export const formatDate = (date: Date) => {
   return new Intl.DateTimeFormat('en-US', {dateStyle: 'full', timeStyle: 'long'}).format(date);
}
export const fromHtmlEntities = function(string: string) {
   return (string+"").replace(/&#\d+;/gm,function(s) {
      return String.fromCharCode(Number(s.match(/\d+/gm)![0]));
   })
};
