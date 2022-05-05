using System;

namespace StoriesByUs.Utils
{
    public static class WordCounter
    {
        public static int Count(string text)
        {
            char[] delimiters = new char[] { ' ', '\r', '\n' };
            return text.Split(delimiters, StringSplitOptions.RemoveEmptyEntries).Length;
        }
    }
}
