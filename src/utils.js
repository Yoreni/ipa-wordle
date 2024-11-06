export function arraysEqual(list1, list2) 
{
    if (list1 === list2) return true;
    if (list1 == null || list2 == null) return false;
    if (list1.length !== list2.length) return false;
  
    for (var i = 0; i < list1.length; ++i) {
      if (list1[i] !== list2[i]) return false;
    }
    return true;
}